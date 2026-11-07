# Contenttypes Framework

```
Created at: 2025-03-27
```

## What is it?

A generic interface for working with Django models.

## The ContentType model

The `ContentType` model is at the core of the framework.
It has the columns

- app_label: str
- model: str
- name: str (verbose name obtained from the model's `verbose_name` attribute)

Rows are injected into that table whenever new models are installed.

There are methods on this model for both finding the model for a row, and for
getting a row for a model.

- `ContentType.get_object_for_this_type(...get() args...)`
  Takes a set of valid lookup arguments for the model the ContentType
  represents, and does a get() lookup on that model, returning the
  corresponding object from the underlying model.
- `ContentType.model_class()` get the model for a row.

```py
from django.contrib.contenttypes.models import ContentType
user_type = ContentType.objects.get(app_label="auth", model="user")
user_type
# <ContentType: user>

user_type.model_class()
# <class 'django.contrib.auth.models.User'>
user_type.get_object_for_this_type(username="Guido")
# <User: Guido>
```

## Generic Relations

`ContentType` is also used for Generic Relations.

You can relate another model to `ContentType` as a way of tying instances of it
to particular model classes, and use these methods to get access to those model
classes.

```py
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class TaggedItem(models.Model):
    tag = models.SlugField()
    # STEP 1: You need a foreign key to the ContentType model.
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    # STEP 2: A field that can store the type of "id" to any of the desired
    # generic models you want to link to.
    # NOTE: you can't support multiple objects with different id types under
    # this strategy. Unless you use something like a varchar that can be
    # coerced to different types.
    object_id = models.PositiveIntegerField()
    # STEP 3: Give the model a GenericForeignKey, and pass it the names of the
    # two fields described above. If these fields are named “content_type” and
    # “object_id”, you can omit this – those are the default field names.
    # NOTE: this field is not "filterable" so the following will fail:
    # TaggedItem.objects.filter(content_object=guido)
    content_object = GenericForeignKey("content_type", "object_id")

    def __str__(self):
        return self.tag

    class Meta:
        indexes = [
            # These fields are not automatically index, so create your own.
            models.Index(fields=["content_type", "object_id"]),
        ]
```

Say you want to get the object of that content type:

```py
from django.contrib.auth.models import User
guido = User.objects.get(username="Guido")
t = TaggedItem(content_object=guido, tag="bdfl")
t.save()
t.content_object
# <User: Guido>

guido.delete()
t.content_object  # returns None
```

You can also use a reverse relationship:

```py
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models


class Bookmark(models.Model):
    url = models.URLField()
    tags = GenericRelation(TaggedItem)

b = Bookmark(url="https://www.djangoproject.com/")
b.save()
t1 = TaggedItem(content_object=b, tag="django")
t1.save()
t2 = TaggedItem(content_object=b, tag="python")
t2.save()
b.tags.all()
```

## Resources

Official docs:
https://docs.djangoproject.com/en/5.1/ref/contrib/contenttypes/

Blog post describing why you should not use this:
https://lukeplant.me.uk/blog/posts/avoid-django-genericforeignkey/
