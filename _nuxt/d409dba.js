(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{371:function(e,n,t){"use strict";t.r(n);var o={data:function(){return{petalVsSepal:"/images/iris/sepal_vs_petal.png",pairPlot:"/images/iris/pair_plot.png",petalLenVsWidth:"/images/iris/petal_len_vs_width.png",petalLenVsWidthAgg:"/images/iris/petal_len_vs_width_agg.png",petalLenVsWidthAgg5:"/images/iris/petal_len_vs_width_agg_5.png",sepalLenVsWidthAgg:"/images/iris/sepal_len_vs_width_agg.png",sepalLenVsWidthWard:"/images/iris/sepal_len_vs_width_ward.png",petalLenVsWidthKMeans:"/images/iris/petal_len_vs_width_kmeans.png",dendrogram:"/images/iris/dendrogram.png"}},head:{title:"Iris Dataset",meta:[{hid:"description",name:"description",content:"Iris Dataset - Exploratory data Analysis in Python - Marcelo Fernandes"}]}},r=t(58),l=t(75),h=t.n(l),d=t(359),c=t(360),v=t(361),_=t(362),m=t(232),w=t(239),f=t(240),component=Object(r.a)(o,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-layout",{staticClass:"post"},[t("v-flex",[t("v-row",[t("h1",[e._v("Iris Dataset - Exploratory Data Analysis")])]),e._v(" "),t("v-row",[t("p",{staticClass:"caption"},[e._v("Date: 2021-04-20")])]),e._v(" "),t("v-row",[t("p",{staticClass:"caption"},[e._v("→ You can read this post"),t("a",{attrs:{href:"/files/reports/iris_dataset_exploration.ipynb"}},[e._v("\n          as a jupyter notebook.\n        ")])])]),e._v(" "),t("v-row",[t("p",[e._v("\n          The iris flower dataset, also referred as "),t("i",[e._v("Fisher's Iris dataset")]),e._v("\n          (after Ronald Fisher), was firstly introduced in 1936 and has\n          since been incredibly popular due to its simple domain and\n          its somehow magical ability to produce good statistical results.\n        ")]),e._v(" "),t("p",[e._v("\n          The dataset consists of 150 samples from 3 species of Iris flower,\n          namely "),t("i",[e._v("Iris versicolor, Iris virginica, and Iris setosa")]),e._v(".\n          The classes are evenly distributed in the dataset, meaning that\n          the 3 classes have 50 samples each.\n          Each sample contains the width and length of both sepals and\n          petals.\n        ")])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.petalVsSepal,target:"_blank"}},[t("img",{attrs:{src:e.petalVsSepal}})])]),e._v(" "),t("v-row",[t("p",{staticClass:"small-text"},[t("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),t("v-row",[t("h2",[e._v("Loading the dataset")])]),e._v(" "),t("v-row",[t("p",[e._v("\n          The dataset is provided by the University of California Irvine \n          Machine Learning Repository. The url for downloading the file is:\n        ")]),e._v(" "),t("p",[e._v("\n          https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data\n        ")]),e._v(" "),t("p",[e._v("\n          The data file is formatted as a csv file. To load this\n          file into the memory you can use the code below:\n        ")])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Python code\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nimport requests\n\nurl = (\n    'https://archive.ics.uci.edu/'\n    'ml/machine-learning-databases'\n    '/iris/iris.data'\n)\n\nresponse = requests.get(url)\nresponse_decoded = response.content.decode('utf-8')\n\n# Split the response line by line, using a comma delimiter.\n# Also handles the empty line in the end of the file.\nraw_dataset = [\n    row.split(',') \n    for row in response_decoded.split('\\n')\n    if row\n]\ndataset = [{\n    'sepal_length': float(row[0]),\n    'sepal_width': float(row[1]),\n    'petal_length': float(row[2]),\n    'petal_width': float(row[3]),\n    'iris_class': row[4],\n} for row in raw_dataset]\n")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("p",[t("br"),e._v("\n          The loaded and parsed dataset looks like this:\n        ")])]),e._v(" "),t("v-row",[t("blockquote",[t("pre",[e._v("[{'sepal_length': 5.1,\n  'sepal_width': 3.5,\n  'petal_length': 1.4,\n  'petal_width': 0.2,\n  'iris_class': 'Iris-setosa'},\n {'sepal_length': 4.9,\n  'sepal_width': 3.0,\n  'petal_length': 1.4,\n  'petal_width': 0.2,\n  'iris_class': 'Iris-setosa'},\n {'sepal_length': 4.7,\n  'sepal_width': 3.2,\n  'petal_length': 1.3,\n  'petal_width': 0.2,\n  'iris_class': 'Iris-setosa'},\n  ...],")])])]),e._v(" "),t("v-row",[t("h2",[e._v("Using pandas DataFrame class")])]),e._v(" "),t("v-row",[t("p",[e._v("\n          In order to facilitate the extraction of some basic statistics,\n          we will instantiate a DataFrame object using the dataset\n          we parsed in the previous step:\n        ")])]),e._v(" "),t("v-row",[t("p"),t("blockquote",[t("pre",[e._v("import pandas as pd\n\ndf = pd.DataFrame(data=dataset)")])]),t("p")]),e._v(" "),t("v-row",[t("h2",[e._v("Pair plot view")])]),e._v(" "),t("v-row",[t("p",[e._v("\n          A pair plot allows us to display the relationships between variables\n          in a dataset in a pairwise view. It is particularly useful for\n          quickly understanding relevant variables and for determining types\n          of regression analysis to use.\n        ")])]),e._v(" "),t("v-row",[t("blockquote",[t("pre",[e._v("import seaborn as sns\n\nsns.pairplot(df, hue='iris_class')")])])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.pairPlot,target:"_blank"}},[t("img",{attrs:{src:e.pairPlot}})])]),e._v(" "),t("v-row",[t("p",[e._v("\n          Note that the main diagonal plots an univariate distribution\n          that shows the marginal distribution of the data in each column.\n          E.g., take the graph from the first element in the main diagonal.\n          This graph is the univariate distribution of sepal length.\n          From this, we can estimate that if an iris species has a sepal\n          length of 5cm, it is way more likely to be a Setosa rather than a\n          Veriscolor or Virginica.\n        ")]),e._v(" "),t("p",[e._v("\n          There is a few things to notice from the pair plot view above:\n        ")])]),e._v(" "),t("v-row",[t("ol",[t("li",[e._v("\n            In all the scatter plots, the Iris Setosa species\n            belongs to a cluster of its own. In other words, we don't see\n            entries from Versicolor and Virginica (green and orange) overlapping\n            with Setosa entries (blue) in any of the scatter plots above.\n          ")]),e._v(" "),t("li",[e._v("\n            Although the Veriscolor and Virginica entries usually overlap,\n            this overlapping is due to a few outliers, therefore finding the\n            proper clusters that minimise prediction errors won't be an\n            impossible task.\n          ")]),e._v(" "),t("li",[e._v("\n            Either petal_width or petal_length can be used to completely\n            identify Iris Setosa entries from this database. Although this\n            generalisation may not hold for a larger dataset, it is good to\n            keep in mind that Setosas have the smallest petals in both length\n            and width.\n          ")]),e._v(" "),t("li",[e._v("\n            Virginica is the only class to present petals with widths of more\n            than 2 centimetres. It is also the one to present petals with length\n            of more than 6cm.\n          ")]),e._v(" "),t("li",[e._v("\n            The combination of the variables sepal_length and sepal_width\n            does not seem to be a good choice for distinguishing\n            Virginicas from Versicolors.\n          ")])])]),e._v(" "),t("v-row",[t("p",[e._v("\n          One interesting scatter plot that would show us relatively clean\n          clusters is the petal_width vs petal_length one:\n        ")])]),e._v(" "),t("v-row",[t("blockquote",[t("var",[t("pre",[e._v("sns.scatterplot(\n    data=df,\n    x='petal_width', y='petal_length',\n    hue='iris_class'\n)")])])])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.petalLenVsWidth,target:"_blank"}},[t("img",{attrs:{src:e.petalLenVsWidth}})])]),e._v(" "),t("v-row",[t("p",{staticClass:"small-text"},[t("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),t("v-row",[t("p",[e._v("\n          We can see how the three clusters in the sketch above are relatively\n          apart from each other (even though there is some small error\n          between Versicolor and Virginica).\n          Other scatter plots that also indicate good separation of classes are:\n          sepal_width vs petal_width and sepal_width vs petal_length.\n        ")]),e._v(" "),t("p",[e._v("\n          For a quick analysis the sketch above would be sufficient as the\n          result of a clustering algorithm would be pretty obvious, but in\n          order to confirm the sketch above is valid let's plot the result\n          of the K-means algorithm applied to the same data.\n        ")])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.petalLenVsWidthKMeans,target:"_blank"}},[t("img",{attrs:{src:e.petalLenVsWidthKMeans}})])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Python code\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v('\nfrom sklearn.cluster import KMeans\nimport matplotlib.pyplot as plt\n\nX = df[[\'petal_width\', \'petal_length\']]\nkm = KMeans(n_clusters=3)\nkm.fit(X)\ny_kmeans = km.predict(X)\n\nsns.scatterplot(\n    data=df,\n    x="petal_width", y="petal_length",\n    hue=y_kmeans\n)\ncenters = km.cluster_centers_\nplt.scatter(\n    centers[:, 0],\n    centers[:, 1],\n    c=\'black\',\n    s=200, alpha=0.4\n)\nplt.xlabel("petal_width")\nplt.ylabel("petal_length")')])])])])],1)],1)],1),e._v(" "),t("v-row",[t("p",[t("br"),e._v("\n          We can infer that 0=Virginica, 1=Setosa, 2=Versicolor.\n          As expected, we can see that there are prediction errors between\n          Versicolor and Virginica when comparing with the previous plot,\n          but in general the clusters have a satisfiable accuracy considering\n          we are only taking into account two dimensions of the data.\n        ")])]),e._v(" "),t("v-row",[t("h2",[e._v("\n          Can we find new taxonomies?\n        ")])]),e._v(" "),t("v-row",[t("p",[e._v("\n          Some views from the pair plot above suggest that there is a \n          small amount of differences between the Versicolor and the\n          Virginica species. Besides that, when analysing the sepal width\n          against the sepal length, there seems to be no clear distinction\n          between both species. This might mean that there is the opportunity\n          to analyse whether a missing taxonomy could be included to better\n          split the differences between those two species, or if they both\n          species should just be merged together into one.\n        ")]),e._v(" "),t("p",[e._v("\n          Even if the analysis proves untrue for both hypothesis, the exercise\n          itself is still a valid effort.\n        ")]),e._v(" "),t("p",[e._v("\n          The algorithm that will be used to help us with this task is called\n          Agglomerative Hierarchical Clustering. This type of clustering\n          technique does not involve assuming the number of clusters a priori,\n          which gives us the flexibility of finding new taxonomies without\n          having to assume or infer opinions about the dataset.\n        ")]),e._v(" "),t("p",[e._v("\n          It is important to point out a few limitations of this clustering\n          technique: A) highly sensitive to noise and\n          outliers. B) Difficulty handling non-globular shapes. C) Difficulty\n          handling clusters of different sizes.\n        ")]),e._v(" "),t("p",[e._v("\n          To highlight the fragility pointed out by A) let's run the algorithm\n          for the sepal width and length dimensions using the Euclidean affinity\n          along with the Single linkage:\n        ")])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.sepalLenVsWidthAgg,target:"_blank"}},[t("img",{attrs:{src:e.sepalLenVsWidthAgg}})])]),e._v(" "),t("v-row",[t("p",{staticClass:"small-text"},[t("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Python code\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nfrom sklearn.cluster import AgglomerativeClustering \n\nX = df[['sepal_width', 'sepal_length']]\n\nac = AgglomerativeClustering(\n    n_clusters=3,\n    affinity='euclidean',\n    linkage='single'\n)\ny_ac = ac.fit_predict(X)\n\nsns.scatterplot(\n    data=df,\n    x=\"sepal_width\", y=\"sepal_length\",\n    hue=y_ac\n)")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("p",[t("br"),e._v("\n          The result is not nearly satisfactory. 147 samples were put into\n          the same class, which is obviously untrue. The combination of dimensions\n          chosen along with using the Single linkage criterion for\n          calculating distances is not the appropriate configuration to solve\n          this clustering problem. A better linkage criterion to use for this\n          problem would be the ward criterion:\n        ")])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.sepalLenVsWidthWard,target:"_blank"}},[t("img",{attrs:{src:e.sepalLenVsWidthWard}})])]),e._v(" "),t("v-row",[t("p",{staticClass:"small-text"},[t("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Python code\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nfrom sklearn.cluster import AgglomerativeClustering \n\nX = df[['sepal_width', 'sepal_length']]\n\nac = AgglomerativeClustering(\n    n_clusters=3,\n    affinity='euclidean',\n    linkage='ward'\n)\ny_ac = ac.fit_predict(X)\n\nsns.scatterplot(\n    data=df,\n    x=\"sepal_width\", y=\"sepal_length\",\n    hue=y_ac\n)")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("p",[t("br"),e._v("\n          The result is still unsatisfactory, but there is less error when\n          compared to the original classification.\n        ")]),e._v(" "),t("p",[e._v("\n          Now let's go back to the petal width/length dimensions and see\n          how the agglomerative clustering compares to the K-means clustering\n          applied earlier.\n        ")])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.petalLenVsWidthAgg,target:"_blank"}},[t("img",{attrs:{src:e.petalLenVsWidthAgg}})])]),e._v(" "),t("v-row",[t("p",{staticClass:"small-text"},[t("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Python code\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nfrom sklearn.cluster import AgglomerativeClustering \n\nX = df[['petal_width', 'petal_length']]\n\nac = AgglomerativeClustering(\n    n_clusters=3,\n    affinity='euclidean',\n    linkage='ward'\n)\ny_ac = ac.fit_predict(X)\n\nsns.scatterplot(\n    data=df,\n    x=\"petal_width\", y=\"petal_length\",\n    hue=y_ac\n)")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("p",[t("br"),e._v("\n          The result is very similar to the K-means clustering algorithm, there\n          are only two samples that got a different classification.\n        ")]),e._v(" "),t("p",[e._v("\n          One interesting point to raise is that adding new clusters means\n          creating subdivisions between Versicolor and Virginica, but Setosa\n          continues to be isolated in its own cluster. Using 5 clusters:\n        ")])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.petalLenVsWidthAgg5,target:"_blank"}},[t("img",{attrs:{src:e.petalLenVsWidthAgg5}})])]),e._v(" "),t("v-row",[t("p",{staticClass:"small-text"},[t("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Python code\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nfrom sklearn.cluster import AgglomerativeClustering \n\nX = df[['petal_width', 'petal_length']]\n\nac = AgglomerativeClustering(\n    n_clusters=6,\n    affinity='euclidean',\n    linkage='ward'\n)\ny_ac = ac.fit_predict(X)\n\nsns.scatterplot(\n    data=df,\n    x=\"petal_width\", y=\"petal_length\",\n    hue=y_ac\n)")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("p",[t("br"),e._v("\n          Looking blindly at the data, we could make the mistake of saying that\n          there might be room for more taxonomies to be explored between\n          Versicolor and Virginica based on these two dimensions alone, but\n          in reality this assumption is too big of a jump as it is not\n          considering other dimensions (features) that might be more important\n          for classifying a specie.\n          A more reasonable assertion to say is that\n          Iris Setosa is its own specie as its cluster remains unchanged even when\n          trying to create more clusters for the dataset, whereas the distinction\n          between Versicolor and Virginica remains ambiguous if only looking\n          unilaterally through this set of dimensions.\n        ")])]),e._v(" "),t("v-row",[t("h3",[e._v("Dendrogram")])]),e._v(" "),t("v-row",[t("p",[e._v("\n          We have mentioned above that one of the strengths of the hierarchical\n          algorithm we used is that it does not need to assume an initial\n          number of clusters. We haven't used this advantage yet.\n        ")]),e._v(" "),t("p",[e._v("\n          Hierarchical clustering algorithms create dendrograms in the process\n          of fitting the data. These dendrograms are used to define what is the\n          most optimal amount of clusters to use. This will allows us to\n          understand what mathematics think about our taxonomy.\n        ")]),e._v(" "),t("p",[e._v("\n          The dendrogram can be hard to read when the linkage matrix is\n          large. This is the case as we'll be creating the linkage matrix\n          from all 150 samples. To condense the dendrogram, we can call\n          the scipy function dendogram() with truncate_mode set to 'level'\n          along with the 'p' number of levels we want to display.\n        ")])]),e._v(" "),t("v-row",[t("a",{staticClass:"img-link",attrs:{href:e.dendrogram,target:"_blank"}},[t("img",{attrs:{src:e.dendrogram}})])]),e._v(" "),t("v-row",[t("p",{staticClass:"small-text"},[t("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Python code\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\n# code based and adapted from sklearn:\n# \"Plot Hierarchical Clustering Dendrogram\"\n\nimport numpy as np\n\nfrom matplotlib import pyplot as plt\nfrom scipy.cluster.hierarchy import dendrogram\nfrom sklearn.cluster import AgglomerativeClustering\n\n# makes plot appear larger.\nplt.rcParams['figure.figsize'] = [7, 7]\n\ndef create_linkage_matrix(model):\n    non_leaf_node_children = model.children_\n\n    # counts the number of samples under each node (see plot)\n    counts = np.zeros(non_leaf_node_children.shape[0])\n    n_samples = 150\n    for i, children in enumerate(non_leaf_node_children):\n        count = 0\n        for child in children:\n            if child < n_samples:\n                # it is a leaf node\n                count += 1\n            else:\n                count += counts[child - n_samples]\n        counts[i] = count\n    \n    return np.column_stack([\n        non_leaf_node_children,\n        model.distances_,\n        counts\n    ]).astype(float)\n    \nX = df[[\n    'petal_width', 'petal_length',\n    'sepal_width', 'sepal_length'\n]].to_numpy()\n\nmodel = AgglomerativeClustering(\n    compute_full_tree=True,\n    distance_threshold=0,\n    n_clusters=None\n)\nmodel = model.fit(X)\n\nlinkage_matrix = create_linkage_matrix(model)\n\ndendrogram(linkage_matrix, truncate_mode='level', p=3)\nplt.xlabel(\n    'Number of points in node '\n    '(or index of point if no parenthesis).'\n)\n")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("p",[t("br"),e._v("\n          The higher the distance between nodes in the dendrogram, the\n          larger their dissimilarities. In this particular case, there seems\n          to be no ideal choice for picking 2 or 3 clusters.\n          The horizontal red line points out that there\n          is a big dissimilarity between the cluster made of Setosas (orange)\n          versus the cluster made of the combination of both Virginicas and\n          Versicolors (green), which agrees with our previous analysis.\n          This means that naturally, the hierarchical clustering technique\n          would interpret the dataset as belonging to two clusters only.\n        ")]),e._v(" "),t("p",[e._v("\n          There is one problem with this choice of clusters. Dendrograms need to be\n          interpreted, and much of this interpretation comes with intuition.\n          Although the maximum distance points to 2 clusters, the distance\n          between Virginicas and Versicolors is still relatively significant to\n          be ignored.\n          The brown horizontal line might actually be the best pick in terms\n          of dissimilarity distances for this dataset if we are to consider\n          the dissimilarities between Virginicas and Versicolors significant\n          enough for being included in our taxonomy. If so, 3 would be the\n          ideal number of clusters.\n        ")])]),e._v(" "),t("v-row",[t("h2",[e._v("Other general information for reference (mean, std, min, and max)")])]),e._v(" "),t("v-row",[t("p",[e._v("\n          The code below shows how this extraction of information happens.\n          A more readable format to read this information is provided\n          next.\n        ")])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Python code\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\n# Overall mean\nprint('Overall Mean:')\nprint(df.mean())\n\n# setosa mean\nsetosa_df = df.where(df['iris_class'] == 'Iris-setosa')\nprint('\\nSetosa mean:')\nprint(setosa_df.mean())\n\n# versicolor mean\nversicolor_df = df.where(df['iris_class'] == 'Iris-versicolor')\nprint('\\nVersicolor mean:')\nprint(versicolor_df.mean())\n\n# setosa mean\nvirginica_df = df.where(df['iris_class'] == 'Iris-virginica')\nprint('\\nVirginica mean:')\nprint(virginica_df.mean())\n\n# Overal std\nprint('\\nOverall Standard Deviation:')\nprint(df.std())\n\n# setosa std\nprint('\\nSetosa Standard Deviation:')\nprint(setosa_df.std())\n\n# versicolor std\nprint('\\nVersicolor Standard Deviation:')\nprint(versicolor_df.std())\n\n# setosa std\nprint('\\nVirginica Standard Deviation:')\nprint(virginica_df.std())\n\n# Overal min\nprint('\\nOverall Minimum:')\nprint(df.min())\n\n# setosa min\nprint('\\nSetosa Minimum:')\nprint(setosa_df.min())\n\n# versicolor min\nprint('\\nVersicolor Minimum:')\nprint(versicolor_df.min())\n\n# setosa min\nprint('\\nVirginica Minimum:')\nprint(virginica_df.min())\n\n# Overal max\nprint('\\nOverall Maximum:')\nprint(df.max())\n\n# setosa max\nprint('\\nSetosa Maximum:')\nprint(setosa_df.max())\n\n# versicolor max\nprint('\\nVersicolor Maximum:')\nprint(versicolor_df.max())\n\n# setosa max\nprint('\\nVirginica Maximum:')\nprint(virginica_df.max())\n")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("h3",[e._v("Mean")])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Mean data\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nOverall Mean:\nsepal_length    5.843333\nsepal_width     3.054000\npetal_length    3.758667\npetal_width     1.198667\n\nSetosa mean:\nsepal_length    5.006\nsepal_width     3.418\npetal_length    1.464\npetal_width     0.244\n\nVersicolor mean:\nsepal_length    5.936\nsepal_width     2.770\npetal_length    4.260\npetal_width     1.326\n\nVirginica mean:\nsepal_length    6.588\nsepal_width     2.974\npetal_length    5.552\npetal_width     2.026\n")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("h3",[e._v("Standard Deviation")])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Standard deviation data\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nOverall Standard Deviation:\nsepal_length    0.828066\nsepal_width     0.433594\npetal_length    1.764420\npetal_width     0.763161\n\nSetosa Standard Deviation:\nsepal_length    0.352490\nsepal_width     0.381024\npetal_length    0.173511\npetal_width     0.107210\n\nVersicolor Standard Deviation:\nsepal_length    0.516171\nsepal_width     0.313798\npetal_length    0.469911\npetal_width     0.197753\n\nVirginica Standard Deviation:\nsepal_length    0.635880\nsepal_width     0.322497\npetal_length    0.551895\npetal_width     0.274650\n")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("h3",[e._v("Minimum")])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Minimum data\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nOverall Minimum:\nsepal_length    4.3\nsepal_width     2.0\npetal_length    1.0\npetal_width     0.1\n\nSetosa Minimum:\nsepal_length    4.3\nsepal_width     2.3\npetal_length    1.0\npetal_width     0.1\n\nVersicolor Minimum:\nsepal_length    4.9\nsepal_width     2.0\npetal_length    3.0\npetal_width     1.0\n\nVirginica Minimum:\nsepal_length    4.9\nsepal_width     2.2\npetal_length    4.5\npetal_width     1.4\n")])])])])],1)],1)],1),e._v(" "),t("v-row",[t("h3",[e._v("Maximum")])]),e._v(" "),t("v-row",[t("v-expansion-panels",[t("v-expansion-panel",[t("v-expansion-panel-header",[e._v("\n              [Expand] Minimum data\n            ")]),e._v(" "),t("v-expansion-panel-content",[t("blockquote",[t("pre",[e._v("                  "),t("var",[e._v("\nOverall Maximum:\nsepal_length    7.9\nsepal_width     4.4\npetal_length    6.9\npetal_width     2.5\n\nSetosa Maximum:\nsepal_length    5.8\nsepal_width     4.4\npetal_length    1.9\npetal_width     0.6\n\nVersicolor Maximum:\nsepal_length    7.0\nsepal_width     3.4\npetal_length    5.1\npetal_width     1.8\n\nVirginica Maximum:\nsepal_length    7.9\nsepal_width     3.8\npetal_length    6.9\npetal_width     2.5\n")])])])])],1)],1)],1)],1)],1)}),[],!1,null,"5f9276fe",null);n.default=component.exports;h()(component,{VExpansionPanel:d.a,VExpansionPanelContent:c.a,VExpansionPanelHeader:v.a,VExpansionPanels:_.a,VFlex:m.a,VLayout:w.a,VRow:f.a})}}]);