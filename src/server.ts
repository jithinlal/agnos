import AuthRoute from '~/routes/auth.route';

require('dotenv-safe').config();
import App from '~/app';
import validateEnv from '~/utils/validateEnv';
import IndexRoute from '~/routes/index.route';
import FoodTypeRoute from '~/routes/food-type.route';
import AdminRoute from '~/routes/admin.route';
import ItemRoute from '~/routes/item.route';

validateEnv();

const app = new App([
	new IndexRoute(),
	new AuthRoute(),
	new FoodTypeRoute(),
	new AdminRoute(),
	new ItemRoute(),
]);

app.listen();
