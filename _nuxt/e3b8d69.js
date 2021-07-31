(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{262:function(e,t,n){var content=n(284);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(33).default)("0230b8aa",content,!0,{sourceMap:!1})},283:function(e,t,n){"use strict";n(262)},284:function(e,t,n){var o=n(32)(!1);o.push([e.i,".graph-pic[data-v-7323250a]{padding:30px 0;display:block;width:80%;margin:0 auto}p[data-v-7323250a]{padding-top:10px}",""]),e.exports=o},392:function(e,t,n){"use strict";n.r(t);var o={data:function(){return{studentsTableHeaders:[{text:"Student ID",align:"start",sortable:!1,value:"name"},{text:"Math",align:"start",sortable:!1,value:"math"},{text:"English",align:"start",sortable:!1,value:"English"},{text:"Art",align:"start",sortable:!1,value:"art"}],studentsTableItems:[{name:"1",math:90,English:60,art:90},{name:"2",math:90,English:90,art:30},{name:"3",math:60,English:60,art:60},{name:"4",math:60,English:60,art:90},{name:"5",math:30,English:30,art:30}],covarianceHeaders:[{text:"math",align:"start",sortable:!1,value:"math"},{text:"English",align:"start",sortable:!1,value:"English"},{text:"art",align:"start",sortable:!1,value:"art"}],covarianceItems:[{math:504,English:360,art:180},{math:360,English:360,art:0},{math:180,English:0,art:720}]}},head:{title:"Principal Component Analysis",meta:[{hid:"description",name:"description",content:"Principal Component Analysis - Marcelo Fernandes"}]}},r=(n(283),n(58)),v=n(75),h=n.n(v),l=n(351),c=n(232),_=n(239),m=n(240),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[e._v("Principal Component Analysis")])]),e._v(" "),n("v-row",[n("p",{staticClass:"caption"},[e._v("Date: 2021-03-13")])]),e._v(" "),n("v-row",[n("h2",[e._v("Definition")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Principal component analysis (PCA) is the process of computing the\n        principal components and using them to perform a change of basis\n        on the data, sometimes using only the first few principal components\n        and ignoring the rest.\n      ")]),e._v(" "),n("p",[e._v('\n        The principal components of a collection of points are a sequence\n        of "p" direction vectors, where the i'),n("sup",[e._v("th")]),e._v(" vector is the\n        direction of a line best fits the data while being orthogonal to\n        the first i - 1 vectors.\n      ")]),e._v(" "),n("p",[e._v("\n        PCA is often used for dimensionality reduction. PCA allows to\n        project each data point onto only the first few principal components\n        to obtain a lower-dimensional data while preserving as much of the\n        data's variation as possible.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Steps to perform the PCA")])]),e._v(" "),n("v-row",[n("h3",[e._v("1. Standardisation")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The PCA is sensitive about the variance of initial variables.\n        I.e., if there is a large difference between the ranges of initial\n        variables, those variables with the larger ranges will dominate over\n        the small ones. In this sense, it is better to standardised\n        all initial variables within the range of 0 to 1.\n      ")]),e._v(" "),n("p",[e._v("\n        This is done mathematically by subtracting the mean and dividing\n        by the standard deviation for each value of each variable.\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("var",[e._v("z = (value - mean) / standard_deviation")])])]),e._v(" "),n("v-row",[n("h3",[e._v("2. Computing the Variance Matrix")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The covariance matrix helps to explain how the variables in the\n        dataset are varying from the mean with respect to each other, therefore\n        revealing any relationship between them.\n      ")]),e._v(" "),n("p",[e._v("\n        The importance of this step comes from the fact that highly correlated\n        variables may contain redundant information, and can therefore be\n        removed.\n      ")]),e._v(" "),n("p",[e._v("\n      The covariance matrix is a "),n("i",[e._v("p x p")]),e._v(" symmetric matrix\n      "),n("var",[e._v("(A = A"),n("sup",[e._v("T")]),e._v(" or a"),n("sub",[e._v("ij")]),e._v(" = a"),n("sub",[e._v("ji")]),e._v(")")]),e._v("\n      that has as entries the covariances associated with all possible\n      pairs of the initial variables.\n      ")]),e._v(" "),n("p",[e._v("\n        For a 3-dimensional dataset of 3 variabls "),n("var",[e._v("x, y, z")]),e._v(" the\n        the covariance matrix is a 3x3 matrix of the form:\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("var",[e._v("\n          Cov(x,x) Cov(x,y) Cov(x,z)"),n("br"),e._v("\n          Cov(y,x) Cov(y,y) Cov(y,z)"),n("br"),e._v("\n          Cov(z,x) Cov(z,y) Cov(z,z)"),n("br")])])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Since the covariance of a variable with itself is its variance\n        "),n("var",[e._v("Cov(a,a) = Var(a) = σ"),n("sup",[e._v("2")])]),e._v(",\n        the main diagonal will be composed by the variances of each\n        initial variable. And since covariance is a commutative operation\n        "),n("var",[e._v("Cov(a,b) = Cov(b,a)")]),e._v(", the entries of the covariance matrix\n        are symmetric with respect to the main diagonal.\n      ")]),e._v(" "),n("p",[e._v("\n      The signal of the covariance is very important.A "),n("b",[e._v("positive")]),e._v("\n      covariance means that the two variables increase or decrease together\n      (correlated), whereas a "),n("b",[e._v("negative")]),e._v(" covariance means that one\n      variable increases when the other decreases (inversely correlated).\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("\n        3. Compute the eigenvectors and eigenvalues of the covariance\n        matrix to identify the principal components\n      ")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Principal components are new variables that are constructed\n        as linear combinations of the initial variables.\n        These combinations are done in a way that the new variables\n        (principal components) are uncorrelated between themselves\n        and most of the information within the initial variables is\n        squeezes or compressed into the first components. A 10 dimensional\n        data would make up 10 principal components, but PCA tries to\n        maximise information in the first component, then it tries\n        to maximise the remaining information in the second and so on.\n      ")]),e._v(" "),n("p",[e._v("\n        This way of generating the principal components allows you to\n        reduce dimensionality without losing too much information.\n        One important caveat is that the principal components are less\n        interpretable and don't have any real meaning since they\n        are constructed from linear combinations of the initial variables.\n      ")]),e._v(" "),n("p",[e._v("\n        Geometrically, the principal components represent the directions\n        in which the data has the maximum amount of variance. I.e., the lines\n        that capture the most information of the data.\n        The interpretation is as follows: The larger the variance carried by\n        a line, the larger the dispersion of the data points along it,\n        and the larger the dispersion along a line, the more\n        information said line has. Another way to think about this is that\n        the principal components are new axes that provide the\n        best angle to see and evaluate the data, so that differences\n        between observations are better visible.\n      ")]),e._v(" "),n("p",[e._v("\n        The eigenvectors and eigenvalues are the directions of the\n        axes where there is the most variance (most information) and that\n        we call the principal components. And the eigenvalues are simply\n        the coefficients attached to eigenvectors, which give the amount of\n        variance carried in each principal component. By ranking the\n        eigenvectors from the highest to the lowest eigenvalues, we'll\n        get the principal components in order of significance.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("4. Create the feature vectors")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The feature vector is created by selecting the eigenvectors \n        that have the biggest eigenvalues and creating a new matrix\n        where the remaining eigenvectors compose its columns.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("5. [FINAL] Recast the data along the principal components axes")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Now we use the feature vector formed using the eigenvectors of\n        the covariance matrix, to reorient the data from the original axes\n        to the ones represented by the principal components. This can be\n        done by multiplying the transpose of the original dataset by\n        the transpose of the feature vector\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("p",[n("var",[e._v("\n            FinalDataSet = FeatureVector"),n("sup",[e._v("T")]),e._v(" * StandardizedOriginalDataSet"),n("sup",[e._v("T")])])])])]),e._v(" "),n("v-row",[n("h2",[e._v("\n        Example\n      ")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Assume that our data in matrix "),n("b",[e._v("X")]),e._v(" to be the score\n        of 5 students in 5 different subjects, and that to be our full\n        population:"),n("br"),n("br")])]),e._v(" "),n("v-row",[n("v-data-table",{attrs:{headers:e.studentsTableHeaders,items:e.studentsTableItems,"item-key":"name","hide-default-footer":""}})],1),e._v(" "),n("v-row",[n("p",[n("br"),e._v("From the table above we have our matrix "),n("b",[e._v("X")]),e._v(":\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("p",[n("var",[e._v("\n          90 60 90"),n("br"),e._v("\n          90 90 30"),n("br"),e._v("\n          60 60 60"),n("br"),e._v("\n          60 60 90"),n("br"),e._v("\n          30 30 30"),n("br")])])])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The mean matrix (average of each column), is:\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("p",[n("var",[e._v("\n          66 60 60\n        ")])])])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The next step is to find the covariance matrix, where each element\n        can be found by calculating:\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("p",[n("var",[e._v("\n          for a full population:"),n("br"),e._v("\n          cov(X,Y) = (1/n) * sum( (Xi - mean(x)) * (Yi - mean(y)) )"),n("br"),n("br"),e._v("\n          for a sample of the population:"),n("br"),e._v("\n          cov(X,Y) = (1/n-1) * sum( (Xi - mean(x)) * (Yi - mean(y)) )"),n("br"),n("br")])])])]),e._v(" "),n("v-row",[n("p",[e._v("\n        By following the formula above we find our covariance matrix:\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("v-data-table",{attrs:{headers:e.covarianceHeaders,items:e.covarianceItems,"item-key":"name","hide-default-footer":"","hide-default-header":""}})],1)]),e._v(" "),n("v-row",[n("p",[n("br"),e._v("A few points to take from this covariance matrix are:")])]),e._v(" "),n("v-row",[n("ul",[n("li",[e._v("\n          The main diagonal represents the variance (σ"),n("sup",[e._v("2")]),e._v(") of\n          each test. The arts presents the biggest variance (720), whereas\n          the English test presents the smallest (360).\n        ")]),e._v(" "),n("li",[e._v("\n          The covariance is between tests is displayed in the elements\n          out of the main diagonal.\n        ")]),e._v(" "),n("li",[e._v("\n          The covariance between math and English is positive (360), and\n          the covariance between math and art is also positive (180).\n          This means that the scores tend to increase/decrease in the\n          same way. As scores on math go up, scores on art and English\n          also tend to go up, and vice versa.\n        ")]),e._v(" "),n("li",[e._v("\n          The covariance between English and art is zero. This means \n          that there is no predictable relationship between the movement\n          of English and art scores.\n        ")])])]),e._v(" "),n("v-row",[n("p",[n("br"),e._v("\n        The next step is to calculate the eigenvalues and eigenvectors\n        from the covariance matrix\n      ")]),e._v(" "),n("p",[e._v("\n        Let "),n("var",[e._v("A")]),e._v(" be a square matrix, "),n("var",[e._v("v")]),e._v(" a vector\n        and "),n("var",[e._v("λ")]),e._v(" a scalar that satisfies\n        "),n("var",[e._v("Av = λv")]),e._v(", then "),n("var",[e._v("λ")]),e._v(" is called the\n        eigenvalue associated with eigenvector "),n("var",[e._v("v")]),e._v(" of "),n("var",[e._v("A")])]),e._v(" "),n("p",[e._v("\n        The eigenvalues of "),n("var",[e._v("A")]),e._v(" are roots of the characteristic\n        equation:\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("var",[e._v("det(A-λI) = 0")])])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Where "),n("var",[e._v("I")]),e._v(" is the identity matrix.\n      ")]),e._v(" "),n("p",[e._v("\n        This will resolve into the following equation:\n      ")])]),e._v(" "),n("v-row",[n("p"),n("blockquote",[n("var",[e._v("\n          -λ"),n("sup",[e._v("3")]),e._v(" + 1584λ"),n("sup",[e._v("2")]),e._v(" + 25660800 = 0\n        ")])]),e._v(" "),n("p")]),e._v(" "),n("v-row",[n("p",[e._v("Where:")])]),e._v(" "),n("v-row",[n("p"),n("blockquote",[n("var",[e._v("\n          λ ≈ 44.81966..."),n("br"),e._v("\n          λ ≈ 629.11039..."),n("br"),e._v("\n          λ ≈ 910.06995..."),n("br")])]),e._v(" "),n("p")]),e._v(" "),n("v-row",[n("p",[e._v("\n        Find the eigenvectors by solving the linear equations originated from\n        "),n("var",[e._v("CovarianceMatrix . v = λ . v")]),e._v(" for each value of\n        λ. This is a bit extensive, let's skip to the results:\n      ")])]),e._v(" "),n("v-row",[n("blockquote",[n("var",[n("p",[e._v("\n        v1:"),n("br"),e._v("\n        -3.75100...,"),n("br"),e._v("\n        4.28441...,"),n("br"),e._v("\n        1\n        ")]),e._v(" "),n("p",[e._v("\n        v2:"),n("br"),e._v("\n        -0.50494...,"),n("br"),e._v("\n        -0.67548...,"),n("br"),e._v("\n        1\n        ")]),e._v(" "),n("p",[e._v("\n        v3:"),n("br"),e._v("\n        1.05594...,"),n("br"),e._v("\n        0.69108...,"),n("br"),e._v("\n        1\n        ")])])])]),e._v(" "),n("v-row",[n("p",[e._v("\n      Now the last step is pretty straightforward. We need to pick the\n      eigenvectors which eigenvalues are the highest. With those two\n      eigenvectors, we'll make our new matrix with a reduced dimensionality:\n      ")])]),e._v(" "),n("v-row",[n("p"),n("blockquote",[n("var",[e._v("\n          1.05594 -0.50494"),n("br"),e._v("\n          0.69108 -0.67548"),n("br"),e._v("\n          1.00000  1.00000"),n("br")])]),e._v(" "),n("p")])],1)],1)}),[],!1,null,"7323250a",null);t.default=component.exports;h()(component,{VDataTable:l.a,VFlex:c.a,VLayout:_.a,VRow:m.a})}}]);