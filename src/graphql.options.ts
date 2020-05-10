import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { join } from 'path'


@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      context: ({ req, res }) => ({ req, res }),
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      installSubscriptionHandlers: true,
      debug: true,
      introspection: true,
      playground: true,
      cors: true,
    }
  }
}
