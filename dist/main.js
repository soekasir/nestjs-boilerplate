"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("./config/config");
const app_module_1 = require("./modules/app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    if ((0, config_1.isDevelopment)()) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Testing')
            .setDescription('WEB PROGRAMMER Test - PT. Deptech Digital Indonesia')
            .setVersion('1.0')
            .addTag('api')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/', app, document);
    }
    app.enableCors();
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map