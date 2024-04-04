1. Области хранения данных
   -БД (json-server)
   -BFF
   -Store

2. Сущности
   -Users Db / BFF / Store
   -Posts Db / Store
   -Roles DB / BFF / Store
   -Comments DB / Store

3. Таблицы DB

-   Users: [user: {
    id,login,password,role_id,registred_at
    }]
-   Posts: [post: {
    id,image_url,title,content,publishing_at
    }]
-   comments:[comment: {
    id,autor_id,content,publishing_comment_at,post_id
    }]
-   Roles: [role: {id,name}]

4.  Cхема BFF
    -сессия текущего пользователя: login / password / role

5.  Схема store

-   Users: [user: {
    id,login,role_id,registred_at
    }]
-   user: {
    id,login,role_id
    }
-   Posts: [post: {
    id,title,imageUrl,publishingAt, commentsCount
    }]
-   post: {
    id,title,imageUrl,content,publishingAt, commentsCount, comments:[comment: {
    id,autor_id,content,publishing_comment_at,post_id
    }]
    }
