import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export const configureSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('EduCenter Pro API')
        .setDescription('Ta\'lim markazi boshqaruv tizimi — to\'liq REST API')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth', 'Autentifikatsiya va foydalanuvchi boshqaruvi')
        .addTag('Students', 'O\'quvchilar boshqaruvi')
        .addTag('Teachers', 'O\'qituvchilar boshqaruvi')
        .addTag('Groups', 'Guruhlar boshqaruvi')
        .addTag('Subjects', 'Fanlar boshqaruvi')
        .addTag('Schedules', 'Dars jadvali')
        .addTag('Attendance', 'Davomat')
        .addTag('Grades', 'Baholar')
        .addTag('Payments', 'To\'lovlar')
        .addTag('Expenses', 'Xarajatlar')
        .addTag('Notifications', 'Bildirishnomalar')
        .addTag('Homework', 'Uyga vazifa')
        .addTag('Materials', 'O\'quv materiallari')
        .addTag('Reports', 'Hisobotlar')
        .addTag('Branches', 'Filiallar')
        .addTag('Rooms', 'Xonalar')
        .addTag('Parents', 'Ota-onalar')
        .addTag('Contracts', 'Shartnomalar')
        .addTag('Tasks', 'Vazifalar')
        .addTag('Teacher Attendance', 'O\'qituvchi davomati')
        .addTag('Teacher Salaries', 'O\'qituvchi maoshlari')
        .addTag('Discounts', 'Chegirmalar')
        .addTag('Leads (CRM)', 'CRM — Lidlar va qo\'ng\'iroqlar')
        .addTag('Inventory', 'Ombor boshqaruvi')
        .addTag('Quizzes', 'Testlar va viktorinalar')
        .addTag('Settings', 'Tizim sozlamalari')
        .build();
    let docs = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, docs, {
        swaggerOptions: {persistAuthorization: true}
    });
}