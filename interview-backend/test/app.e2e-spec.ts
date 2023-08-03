import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Version:0.0');
  });
  it('cities/ without params', () => {
    return request(app.getHttpServer()).get('/cities').expect(400);
  });

  it('cities/ with bad page number', () => {
    return request(app.getHttpServer())
      .get('/cities?query=berlin&page=abc')
      .expect(400);
  });

  it('cities/ get with params', () => {
    const expectedResult = {
      cities: [
        {
          count: 523,
          name: 'Berlin',
          uuid: '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f',
        },
      ],
      count: 1,
    };
    return request(app.getHttpServer())
      .get('/cities?query=berlin&page=0')
      .expect(200)
      .expect(expectedResult);
  });
});
