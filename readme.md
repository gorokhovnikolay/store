<!-- FRONTEND -->
<!-- Списки: -->

Товаров
Категорий
пользавателей

<!-- РОУТЫ -->

    		<!-- <Routes>
    				<Route path="/login" element={<Login />} />
    				<Route path="/register" element={<Register />} />
    				<Route path="/" element={<Main />} />
    				<Route path="/personal" element={<div>personal</div>} />
    				<Route path="/category" element={<CategoryPage />} />
    				<Route path="/product/:productId" element={<Product />} />
    				<Route path="/category/:catId" element={<CategoryPage />} />
    				<Route path="/cart" element={<Cart />} />
    				<Route path="/acceptorder" element={<div>post id</div>} />
    				<Route path="/successorder" element={<Successorder />} />
    				<Route path="/admin" element={<Admin />}>
    					<Route index element={<MainAdmin />} />
    					<Route path="users" element={<Users />} />
    					<Route path="users/edit/:id" element={<EditUser />} />
    					<Route path="personal/edit/:id" element={<EditUser />} />
    					<Route path="orders" element={<Orders />} />
    					<Route path="categoryes" element={<Categorys />} />
    					<Route path="category/edit/:id" element={<CategoryAdd />} />
    					<Route path="category/add" element={<CategoryAdd />} />
    					<Route path="products" element={<Products />} />
    					<Route path="products/edit/:id" element={<ProductEdit />} />
    					<Route path="products/add" element={<ProductAdd />} />
    				</Route>
    				<Route path="*" element={<div>Такой страницы не существует</div>} />
    			</Routes> -->

<!-- СТРАНИЦЫ  -->
<!-- <Route path="/category/:catId" element={<CategoryPage />} />
<Route path="users/edit/:id" element={<EditUser />} />
<Route path="personal/edit/:id" element={<EditUser />} />
<Route path="category/edit/:id" element={<CategoryAdd /
<Route path="products/edit/:id" element={<ProductEdit / -->

<!-- компоненты -->

Кнопка
Подвал
Шапка
Поле ввода
модальное окно
тултип

<!-- BACKEND -->

<!-- get запросы -->

/user данные о текущем пользавателе
/products все товары/товары по параметрам
/product/id один товар
/product/category/categoryId товары конкретной категории
/order все заказы
/category все категории
/cart корзина текущего пользавателя
/admin данные по количеству пользавателей, заказов, товаров
/admin/category все категории
/admin/category/id одна категория
/admin/product все товары
/admin/product/id один товар
/admin/users все пользаватели
/admin/users/id один пользаватель

<!-- post запросы -->

/order создать заказ
/register авторизация
/login регистрация
/logout выход
/admin/product создать товар
/admin/category создать категорию

<!-- patch запросы -->

/cart/delete/id удалить позицию из корзины
/cart добавить товар в корзину
/admin/user/id изменить пользавателя
/admin/category/id изменить категорию
/admin/product/id изменить товар

<!-- delete -->

/admin/user/id удалить пользавателя
/admin/category/id удалить категорию
/admin/product/id удалить товар

<!-- модели -->

User
Product
Order
Category

<!-- middleware  -->

данные о пользавателе по токену в куках
проверка прав доступа

<!-- роуты -->

router.use("/", require("./auth"));
router.use("/user", require("./user"));
router.use("/category", require("./category"));
router.use("/products", require("./product"));
router.use("/product", require("./product"));
router.use("/cart", require("./cart"));
router.use("/order", require("./orders"));
router.use("/admin", require("./admin/admin.main"));
router.use("/admin/category", require("./admin/admin.categoryes"));
router.use("/admin/product", require("./admin/admin.products"));
router.use("/admin/users", require("./admin/admin.users"));
