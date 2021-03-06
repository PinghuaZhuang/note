# 简介

接口是目前：前后端交互(Rest)，系统交互(RPC)最普遍的一种方式。一个好的接口，应该清晰易懂，职责明确，易于维护。反之，则会造成很多困扰。本文针对接口文档编写和维护规范进行流程制定，主体工具以[语雀](http://98du.yuque.com/)和[API Mock](http://apidoc.98du.com/)平台为核心。

## 什么是接口文档？

在项目开发中，前端（客户端、H5）与后端开发需要共同定义接口，编写接口文档。前后端开发根据这个接口文档进行开发，从项目初始到结束都要一直维护。

## 为什么要接口文档？

文档与程序员之间有着一种非常奇妙的关系。一句话概括就是：”写之，痛之。用之，悔之”。怎么解释呢？就是：**写的时候觉得很痛苦，不愿意写！用的时候呢，又后悔当初没有留下文档！** 可见文档是多么重要。以Rest接口为例，文档需要详细的记录请求参数，返回参数，每个字段的意思，是否必填，请求方法等。随着代码的更新，文档也应该及时更新。在很多开发者眼里(包括我自己)，觉得写文档是一件浪费时间的事情，写代码才是正经事。随着工作经验的积累，愈发觉得文档的重要性，不但没浪费时间，反而还在节省时间。

# 术语

| 术语/缩写 | 含义                                                         |
| --------- | ------------------------------------------------------------ |
| REST      | 表征状态转移（Representional State Transfer），一种软件架构风格 |
| JSON      | JavaScript Object Notation，是一种轻量级的数据交换格式       |

# 接口文档编写更新维护流程 

## 流程图

![img](https://cdn.nlark.com/yuque/0/2021/jpeg/741229/1611125561501-6fde78c2-90f8-4f55-bbe8-363e0b424974.jpeg)

## 流程介绍



# 编写规范

## 模板

Here is yuque doc card, click on the link to view:https://98du.yuque.com/98du/puskgo/hvb42f





# 语雀关联钉钉





# 附录



## 状态码定义

> 原地址 ： http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
>
> part of Hypertext Transfer Protocol – HTTP/1.1
>
> RFC 2616 Fielding, et al.



每个状态码描述如下，其中描述的方法可以遵循和响应所需的任何信息。

### 1xx 临时响应

这类状态码表示临时响应，只包括状态行和可选的头，并通过一个空的行终止。这类状态码不需要头文件。由于HTTP / 1没有定义任何1xx状态码，服务器不能发送一个HTTP 1客户端1xx响应除了在实验条件。

客户端必须准备接受一个或多个1xx状态响应的一种常规响应之前，即使客户不指望100（继续）状态信息。意外的1xx状态响应可以由一个用户代理忽略。

代理人必须向前1xx响应，除非代理和客户端之间的连接已关闭，或除非代理本身要求的一代1xx响应。例如，如果一个

代理添加了一个“期待：100继续”的领域，当它转发请求，然后它不需要转发相应的100（继续）响应（的）。

> 基本上我们不会手动返回`1XX`的返回码…

#### 100继续

客户应继续其要求。这个临时的反应是用来通知客户端的请求的初始部分已经收到，尚未被拒绝的服务器。客户应继续发送该请求的其余部分，如果该请求已完成，则忽略此响应。服务器必须在请求完成后发送最终响应。看到的使用作了详细的讨论与此状态代码处理8.2.3节。

#### 101交换协议

服务器理解并愿意遵从客户端的请求，通过升级消息头字段（第14.42节），对于在这个连接上使用的应用程序的更改。该服务器将切换到响应的升级头字段中所定义的协议，并立即终止101个响应的空行。

只有在有利于这样做的时候，该协议才被交换。例如，切换到新版本的HTTP优于旧版本，并切换到一个实时、同步协议可能是有利时，提供资源使用等特点。

### 2xx 成功

这一类的状态码表示客户端的请求已成功接收、理解和接受。

> 通过返回2XX表示请求成功和当前资源的状态

#### 200 OK

请求成功。返回的信息与响应是依赖于该方法中使用的请求，例如：

GET 对应于请求的资源的一个相对应的响应；

HEAD 对应于所请求资源的单位头字段在响应中发送未经任何消息的正文；

POST 一个描述或包含动作结果的实体；

TRACE 包含请求消息的实体，该实体包含终端服务器接收的请求消息。

#### 201创建

这个请求已经完成，并导致了一个新的资源被创建。新创建的资源可以由URI引用在返回的响应实体，通过定位头字段中指定的资源最具体的URI。响应应包含一个包含资源特性和位置的列表（从该用户或用户代理可以选择最合适的资源的列表）的实体。在内容类型头字段中给出的媒体类型指定的实体格式。在返回201状态码之前，源服务器必须创建资源。如果不能立即进行操作，服务器**应当**响应202（接受）响应。

201响应**可能**包含ETag响应头域表示的变体标签实体的要求为刚刚创建的电流值，见14.19节。

> [POST/PUT/PATCH]：用户新建或修改数据成功

#### 202接受

该请求已被接受处理，但处理尚未完成。请求可能会或可能不会最终将采取行动，因为它可能是不允许在处理实际发生。没有从异步操作中重新发送状态码的设备，例如。

202回应是故意不表态。它的目的是允许一个服务器接受一个请求，为一些其他的进程（也许是一个面向批处理的过程，只运行一次），而无需用户代理的连接到服务器坚持，直到该过程完成。返回的单位**应**包括该请求的当前状态的指示，或者是一个状态监视器的指针，或者当用户可以期望被满足的请求时的一些估计。

> [*]：表示一个请求已经进入后台排队（异步任务）

#### 203非权威信息

在实体报头返回的元信息是不明确的设置为从源服务器，而是从本地或第三方复制聚集。设置可能被提出的子集或超集的原始版本。例如，包括对资源的地方标注信息可能会导致由原始服务器称为元信息的一个超集。使用此响应代码是不需要的，只有适当的响应，否则将是200（确定）。

#### 204无内容

服务器已经完成了请求，但不需要返回一个实体，并且希望返回更新的元信息。响应可能包括新的或更新的形式在实体头信息，如果存在，**应该**与请求的变量相关联。

如果客户端是一个用户代理，则**不应该**将它的文档视图从它的文档视图中更改，从而导致请求被发送。这种反应主要是为了让行动不会导致改变用户代理的活动文档视图发生输入，但任何新的或更新的信息应该被应用到文档中的用户代理的积极看法。

204响应**必须**不包括消息体，因此，在头字段之后的第一个空的行总是被终止。

> [DELETE]：用户删除数据成功。

#### 205内容复位

该服务器已完成该请求，该用户代理应重置引起该请求的文档视图。此响应的主要目的是允许输入的动作，通过用户输入，然后由一个结算的形式，其中的输入，以便用户可以很容易地启动另一个输入动作。回应**必须**不包括实体。

#### 206部分内容

服务器已完成对资源的部分请求。请求必须包含一个范围头字段（第14.35节），表示所需的范围，并可能包括一个如果范围头字段（第14.27节），以使请求有条件。

响应**必须**包括以下的标题字段：

```
- Either  a Content-Range header field (section 14.16) indicating
    the range included with this response, or a multipart/byteranges
    Content-Type including Content-Range fields for each part. If a
    Content-Length header field is present in the response, its
    value MUST match the actual number of OCTETs transmitted in the
    message-body.
  - Date
  - ETag and/or Content-Location, if the header would have been sent
    in a 200 response to the same request
  - Expires, Cache-Control, and/or Vary, if the field-value might
    differ from that sent in any previous response for the same
    variant
```

### 3xx 重定向

这个类的状态码表示用户代理需要采取进一步的行动来完成该请求。所需的操作，可以由用户代理进行，而不与用户进行交互，如果只在二次请求中使用的方法是获得或头部。一个客户端应该检测到无限重定向循环，因为这样的循环会产生每个重定向的网络流量。

注：本规范的前版本推荐

五重定向的最大。内容开发者应该知道

有可能是客户，实现这样一个固定

限制。

#### 300多种选择

所请求的资源对应于任何一个表示，每个与它自己特定的位置，和代理驱动的协商信息（第12节），以使用户（或用户代理）可以选择一个首选的表示，并将其请求重定向到该位置。

除非它是一个请求，响应应包括一个包含资源特性和位置的列表（用户或用户代理可以选择最合适的资源的列表）。在内容类型头字段中给出的媒体类型指定的实体格式。根据不同的格式和功能

用户代理，选择最合适的选择可以自动执行。然而，本规范没有定义任何标准的自动选择。

如果服务器有代表性的首选，它应包括在位置字段，表示特定的URI；用户代理可以使用自动重定向位置字段的值。这个响应是可缓存的除非另有说明。

#### 301永久移动

被请求的资源已经被分配了一个新的URI和任何未来的资源引用到这应该用一个返回的URI。链接编辑功能的客户端应当自动链接引用的请求的一个或多个新的引用由服务器返回，在可能的情况下。这个响应是可缓存的除非另有说明。

新的URI应该响应的Location域中给出。除非这是一个HEAD请求，响应的实体应该包含一个超链接及简短说明新的URI。

如果301状态码在响应请求以外的请求而接收，用户代理必须不能自动重定向请求，除非它可以被用户确认，因为这可能改变请求发出的条件。

注：当自动重定向POST请求后

收到一个301状态代码，一些现有的HTTP / 1用户代理

会变成GET请求。

#### 302发现

请求的资源暂时驻留在不同的URI。由于重定向有时可能会改变，客户端应继续使用URI来请求。这种反应只缓存如果表示缓存控制或Expires头域。

临时的URI应该响应的Location域中给出。除非这是一个HEAD请求，响应的实体应该包含一个超链接及简短说明新的URI。

如果302状态码在响应请求以外的请求而接收，用户代理必须不能自动重定向请求，除非它可以被用户确认，因为这可能改变请求发出的条件。

注：指定的客户端不能RFC 1945和RFC 2068

改变重定向请求的方法。然而，大多数

现有的用户代理实现治疗302，如果它是一个303

响应，执行一个位置字段值，无论

原始请求法。状态码307和303有

被添加为服务器，希望使明确明确的

客户期望的反应。

#### 303看其他

对该请求的响应可以在一个不同的URI，应使用该资源的GET方法检索。此方法主要存在于允许一个激活后的脚本的输出将用户代理重定向到选定的资源。新的URI不是原始资源替代的参考。303响应必须不被缓存，但反应到二（重定向）的要求可能是缓存。

不同的URI应该响应的Location域中给出。除非这是一个HEAD请求，响应的实体应该包含一个超链接及简短说明新的URI（S）。

注：许多前HTTP / 1.1用户代理不明白303

状态。当与客户的互操作性是一个值得关注的问题，

302状态码可以使用，因为大多数用户代理反应

在这里描述的302响应

### 4xx 客户端错误

该状态代码4xx类为例，客户似乎有错。除对请求进行响应时，服务器应包含一个包含错误情况的解释的实体，以及它是否是一个临时或永久性条件。这些状态码适用于任何请求方法。用户代理应向用户显示任何包含的实体。

如果客户端发送数据，服务器使用TCP实现必须小心确保客户确认收到的数据包（S）包含响应，服务器关闭前的输入连接。如果客户端继续发送数据到服务器后，服务器的TCP协议栈将发送一个重置数据包到客户端，从而才能阅读和HTTP应用解释删除客户端的未确认的输入缓冲器。

#### 400错误的请求

不能被服务器理解由于语法错误。不需要修改的客户端不应该重复该请求。

#### 401未经授权

请求需要用户身份验证。响应必须包含一个WWW-Authenticate报头域（14.47节）包含一个适用于被请求资源的挑战。客户端可以使用适当的授权头字段（第14.8节）重复该请求。如果该请求已包含授权证书，则401响应显示已拒绝为凭据。如果401个响应包含先前响应的相同的挑战，并且用户代理已经尝试至少一次验证，那么该用户应在响应中给出的实体，因为该实体可能包括相关的诊断信息。HTTP访问认证是“HTTP认证解释：基本和摘要访问认证”[ 43 ]。

#### 402付款要求

这个代码是为将来使用的。

#### 403没有权限访问此网站

服务器理解请求，但拒绝完成它。授权不会帮助和请求不应该重复。如果请求的方法不是头部和服务器希望使公众为什么请求没有被满足，它应该说明在实体拒绝的原因。如果服务器不希望将此信息提供给客户端，可以使用状态码404（未找到）。

#### 404未找到

服务器并没有发现任何匹配的请求URI。没有任何迹象显示条件是暂时或永久性的。如果服务器知道，通过一些内部配置机制，如果服务器知道一个旧资源是永久不可用，并且没有转发地址，则应该使用状态码（410）。此状态代码通常用于当服务器不希望显示该请求已被拒绝，或当没有其他响应是适用的。

##### 405法不允许

在请求行中指定的方法是不允许的请求URI标识的资源。响应必须包含一个允许头包含请求资源的有效方法列表。

#### 406不接受单独

请求所确定的资源是能够生成响应的实体，其内容特性不能接受根据请求发送的接收头的特性。

除非它是一个请求，响应应包括一个实体，它包含一个可供选择的实体特征和位置的列表，用户或用户代理可以选择一个最合适的实体。在内容类型头字段中给出的媒体类型指定的实体格式。根据用户代理的格式和功能，选择最合适的选择可以自动执行。然而，本规范没有定义任何标准的自动选择。

注：HTTP 1.1服务器返回响应，

不能接受根据接收头发送的

请求。在某些情况下，这可能是最好的发送

406响应。鼓励用户代理检查标题

一个输入的响应，以确定是否可以接受。

如果响应可能是不可接受的，用户代理应该暂时停止接收更多的数据，并为进一步的行动决定用户查询。

#### 407代理服务器要求身份验证

此代码类似于401（未经授权），但表示客户端必须首先对其进行身份验证。代理必须返回一个代理身份验证头字段（第14.33节），该头域（第节）包含请求资源的代理的一个挑战。客户端可以使用一个合适的代理授权头域（第14.34节）重复该请求。HTTP访问认证是“HTTP认证解释：基本和摘要访问认证”[ 43 ]。

#### 408请求超时

在服务器准备等待的时间内，客户端没有产生一个请求。该客户可以在任何稍后时间不修改的要求重复该请求。

#### 409冲突

无法完成该请求，因为与资源的当前状态冲突。此代码只允许的情况下，预计用户可能能够解决冲突和重新提交请求。回应主体应包含足够

用户的信息来识别冲突的来源。理想情况下，响应实体将包含足够的信息，用户或用户代理来解决这个问题，但是，这可能是不可能的。

冲突是最有可能发生在响应请求。例如，如果正在使用的版本和实体将包括改变资源与那些由早些时候的冲突（第三方）请求，服务器可能会使用409的反应表明，它无法完成请求。在这种情况下，响应实体可能包含一个在响应内容类型定义的格式中定义的格式的差异的列表。

#### 410了

所请求的资源已不再在服务器上，没有任何转发地址是已知的。这种情况被认为是永久性的。链接编辑功能的客户端应该删除引用的请求后，用户验收。如果服务器不知道，或者没有设备来确定，是否该条件是永久性的，状态码404（未找到）应该使用。这个响应是可缓存的除非另有说明。

410个响应的主要目的是协助网络维护的任务，通知收件人的资源是故意不可用，服务器所有者的愿望，远程链接到该资源被删除。这样的事件是常见的时间有限，推广服务和资源属于个人不再工作在服务器的网站。没有必要标记所有永久不可用的资源为“不留”或保留任何时间长度的标记-这是留给服务器所有者的自由裁量权。

#### 411长度要求

服务器拒绝接受未定义的内容长度的请求。如果在请求消息中添加一个有效的内容长度的头字段，该客户可以重复该请求。

#### 412前提条件失败

在一个或多个请求头字段在服务器上进行测试时，在一个或多个请求头域中给出的前提条件。此响应代码允许客户在条件对当前资源元信息（标题字段数据），从而防止所请求的方法被应用到比预期的另外一个资源。

#### 413请求实体太大

服务器拒绝处理请求，因为请求实体比服务器更大，或者能够处理。服务器可以关闭连接以防止客户端继续请求。

如果条件是暂时的，服务器应该包括一个重试-在头字段显示它是暂时的，并且在什么时候该客户可以再次尝试。

#### 414请求URI太长

服务器拒绝服务请求，因为请求URI是超过了服务器能够解释时间。这种罕见的情况只可能发生在客户端不当将POST请求转换到一个GET长查询信息，当客户进入一个URI的“黑洞”的重定向（例如，重定向的URI前缀指向本身的后缀），或者当服务器通过客户端试图利用安全漏洞使用固定长度的缓冲区读或操纵请求一些服务器目前的攻击下。

#### 415不支持的媒体类型

服务器拒绝服务请求，因为请求的实体不支持被请求的方法所请求的资源。

#### 416请求范围不满足

如果一个请求的服务器应该包含一系列请求标头字段返回此状态码的响应（14.35节），没有一个范围说明符值在这一领域的重叠选定当前资源的程度，并要求不包括如果范围请求标头字段。（字节范围，这意味着第一个字节的POS所有的字节范围规格值均大于所选资源。目前的长度）

当这个状态码返回一个字节范围的请求时，响应应包括指定选定资源的当前长度的内容范围实体头字段（见14.16节）。这种反应不是必须使用多重/ byteranges内容类型。

#### 417期待失败

预期的请求的请求头字段（见第14.20）不能满足此服务器，或，如果服务器是一个代理，该服务器有明确的证据表明，该请求不能满足下一跳服务器。

### 5xx 服务器错误

响应状态码“5”表示在何种情况下服务器知道它犯了错误或执行请求的能力。除对请求进行响应时，服务器应包含一个包含错误情况的解释的实体，以及它是否是一个临时或永久性条件。用户代理应向用户显示任何包含的实体。这些响应代码适用于任何请求方法。

#### 500内部服务器错误

服务器遇到了一个无法预料的情况，它阻止了它的实现。

#### 501未实现

服务器不支持完成请求所需的功能。这是适当的响应时，服务器不承认请求方法，是不能够支持它的任何资源。

#### 502网关错误

服务器作为网关或代理，在试图完成请求时，收到了来自上游服务器的无效响应。

#### 503服务不可用

由于临时超载或服务器的维护，服务器无法处理该请求。其含义是，这是一个暂时的条件，这将是缓解后，一些延迟。如果已知的话，可能在一次重试后显示的延迟的长度。如果没有重试，客户端应该处理的响应，因为它将为500响应。

注：503状态码的存在并不意味着

服务器过载时必须使用它。一些服务器可能希望

简单地拒绝连接。

#### 504网关超时

服务器，而作为网关或代理，没有从URI指定的上游服务器接收到及时响应（如HTTP，FTP，LDAP）或其它辅助服务器（例如DNS）它需要访问尝试完成请求。

注意：注意实施者：一些部署代理是众所周知的

返回400或500时，DNS查询超时。

#### 505 HTTP版本不受支持

服务器不支持或拒绝支持HTTP协议的版本是在请求消息中使用。服务器表示，它是无法或不愿意完成请求使用相同的主要版本为客户端，如在第3.1节中所述，其他与此错误信息。响应应该包含一个实体，该实体描述了为什么不支持该版本以及该服务器支持哪些其他协议。