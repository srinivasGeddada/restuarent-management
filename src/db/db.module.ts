import { Module } from "@nestjs/common";
import { DBProvider } from "./db.providers";

@Module({
    providers: [ ...DBProvider ],
	exports: [ ...DBProvider ]
})
export class DBModule{

}