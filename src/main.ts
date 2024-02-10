import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';
// import { ValidationPipe } from '@nestjs/common';
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // approach2
  // app.use(cookieSession({
  //   keys: ['asdfasdf']
  // }));
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true
  //   }),
  // );

  // approach1: we are not using this approach, but it is good to have this example here
  // setupApp(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
