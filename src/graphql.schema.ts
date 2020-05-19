
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateCatInput {
    name?: string;
    age?: number;
}

export class CreateCatMongoInput {
    name?: string;
    age?: number;
    breed?: string;
}

export abstract class IQuery {
    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;

    abstract getCatsMongo(): CatMongo[] | Promise<CatMongo[]>;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;

    abstract createCatMongo(createCatMongoInput?: CreateCatMongoInput): CatMongo | Promise<CatMongo>;
}

export abstract class ISubscription {
    abstract catCreated(): Cat | Promise<Cat>;
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
}

export class CatMongo {
    id?: number;
    name?: string;
    age?: number;
    breed?: string;
}
