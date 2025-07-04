import { VercelRequest, VercelResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module'; // adapte le chemin si besoin
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { createServer, Server } from 'http';

let server: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  const config = new DocumentBuilder()
    .setTitle('SarayaTech Solution mailing API')
    .setDescription(
      'API documentation for the SarayaTech Solution mailing service',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.init(); // pas app.listen() ici
  return createServer(expressApp);
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    bootstrap()
      .then((createdServer) => {
        server = createdServer;
        server.emit('request', req, res);
      })
      .catch((err) => {
        console.error('Error in handler:', err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    server.emit('request', req, res);
  }
}
