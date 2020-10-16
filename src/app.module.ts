import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealsController } from './controllers/meals.controller';
import { UserController } from './controllers/user.controller';
import { DBModule } from './db/db.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Providers } from './providers/providers';
import { MealsService } from './services/meals.service';
import { UserService } from './services/user.service';

@Module({
	imports: [ DBModule ],
	controllers: [ AppController, UserController, MealsController ],
	providers: [ ...Providers, AppService, UserService, MealsService ]
})
export class AppModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.exclude(
				{ path: '/user/login', method: RequestMethod.POST },
				{ path: '/user/register', method: RequestMethod.POST }
			)
			.forRoutes(UserController, MealsController);
	}
}
