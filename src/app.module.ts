import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RouterModule } from "@nestjs/core";
import { APP_ROUTES } from "./app.routes";
import { ItemsModule } from "./items/items.module";

@Module({
    imports: [
        MongooseModule.forRoot("mongodb+srv://rezendet7:6sHhtPkgtVQ7dgBR@testcluster.i4qyrht.mongodb.net/test?retryWrites=true&w=majority"),
        RouterModule.register(APP_ROUTES),
        ItemsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
