# Finding FKs Pointing To a Model

```
Created at: 2025-04-09
```

```py
from django.apps import apps
from django.db import models

def find_foreign_keys(app, model_name):
    base_model = apps.get_model(app, model_name)
    referencing_models = []

    for app in apps.get_app_configs():
        for model in app.get_models():
            for field in model._meta.fields:
                if isinstance(field, models.ForeignKey) and field.related_model == base_model:
                    referencing_models.append(model)

    return referencing_models

find_foreign_keys("events", "externalevent")
```
