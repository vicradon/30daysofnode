import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { ItemsService } from './items/items.service';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [ItemsModule, AuthzModule],
  controllers: [],
  providers: [ItemsService],
})
export class AppModule {}