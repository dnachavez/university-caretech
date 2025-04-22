
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model StudentHealthForm
 * 
 */
export type StudentHealthForm = $Result.DefaultSelection<Prisma.$StudentHealthFormPayload>
/**
 * Model UploadedForm
 * 
 */
export type UploadedForm = $Result.DefaultSelection<Prisma.$UploadedFormPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studentHealthForm`: Exposes CRUD operations for the **StudentHealthForm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentHealthForms
    * const studentHealthForms = await prisma.studentHealthForm.findMany()
    * ```
    */
  get studentHealthForm(): Prisma.StudentHealthFormDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadedForm`: Exposes CRUD operations for the **UploadedForm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadedForms
    * const uploadedForms = await prisma.uploadedForm.findMany()
    * ```
    */
  get uploadedForm(): Prisma.UploadedFormDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    VerificationToken: 'VerificationToken',
    StudentHealthForm: 'StudentHealthForm',
    UploadedForm: 'UploadedForm'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "verificationToken" | "studentHealthForm" | "uploadedForm"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      StudentHealthForm: {
        payload: Prisma.$StudentHealthFormPayload<ExtArgs>
        fields: Prisma.StudentHealthFormFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentHealthFormFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentHealthFormFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>
          }
          findFirst: {
            args: Prisma.StudentHealthFormFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentHealthFormFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>
          }
          findMany: {
            args: Prisma.StudentHealthFormFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>[]
          }
          create: {
            args: Prisma.StudentHealthFormCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>
          }
          createMany: {
            args: Prisma.StudentHealthFormCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentHealthFormCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>[]
          }
          delete: {
            args: Prisma.StudentHealthFormDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>
          }
          update: {
            args: Prisma.StudentHealthFormUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>
          }
          deleteMany: {
            args: Prisma.StudentHealthFormDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentHealthFormUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentHealthFormUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>[]
          }
          upsert: {
            args: Prisma.StudentHealthFormUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentHealthFormPayload>
          }
          aggregate: {
            args: Prisma.StudentHealthFormAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentHealthForm>
          }
          groupBy: {
            args: Prisma.StudentHealthFormGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentHealthFormGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentHealthFormCountArgs<ExtArgs>
            result: $Utils.Optional<StudentHealthFormCountAggregateOutputType> | number
          }
        }
      }
      UploadedForm: {
        payload: Prisma.$UploadedFormPayload<ExtArgs>
        fields: Prisma.UploadedFormFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadedFormFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadedFormFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>
          }
          findFirst: {
            args: Prisma.UploadedFormFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadedFormFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>
          }
          findMany: {
            args: Prisma.UploadedFormFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>[]
          }
          create: {
            args: Prisma.UploadedFormCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>
          }
          createMany: {
            args: Prisma.UploadedFormCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UploadedFormCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>[]
          }
          delete: {
            args: Prisma.UploadedFormDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>
          }
          update: {
            args: Prisma.UploadedFormUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>
          }
          deleteMany: {
            args: Prisma.UploadedFormDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadedFormUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UploadedFormUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>[]
          }
          upsert: {
            args: Prisma.UploadedFormUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFormPayload>
          }
          aggregate: {
            args: Prisma.UploadedFormAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadedForm>
          }
          groupBy: {
            args: Prisma.UploadedFormGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadedFormGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadedFormCountArgs<ExtArgs>
            result: $Utils.Optional<UploadedFormCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    verificationToken?: VerificationTokenOmit
    studentHealthForm?: StudentHealthFormOmit
    uploadedForm?: UploadedFormOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    uploadedForms: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedForms?: boolean | UserCountOutputTypeCountUploadedFormsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedFormsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadedFormWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
    password: string | null
    role: string | null
    status: string | null
    emailVerified: boolean | null
    verificationToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
    password: string | null
    role: string | null
    status: string | null
    emailVerified: boolean | null
    verificationToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    username: number
    email: number
    password: number
    role: number
    status: number
    emailVerified: number
    verificationToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    password?: true
    role?: true
    status?: true
    emailVerified?: true
    verificationToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    password?: true
    role?: true
    status?: true
    emailVerified?: true
    verificationToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    password?: true
    role?: true
    status?: true
    emailVerified?: true
    verificationToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: string
    status: string
    emailVerified: boolean
    verificationToken: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    status?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    healthForm?: boolean | User$healthFormArgs<ExtArgs>
    uploadedForms?: boolean | User$uploadedFormsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    status?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    status?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    status?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "username" | "email" | "password" | "role" | "status" | "emailVerified" | "verificationToken" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    healthForm?: boolean | User$healthFormArgs<ExtArgs>
    uploadedForms?: boolean | User$uploadedFormsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      healthForm: Prisma.$StudentHealthFormPayload<ExtArgs> | null
      uploadedForms: Prisma.$UploadedFormPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      username: string
      email: string
      password: string
      role: string
      status: string
      emailVerified: boolean
      verificationToken: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    healthForm<T extends User$healthFormArgs<ExtArgs> = {}>(args?: Subset<T, User$healthFormArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    uploadedForms<T extends User$uploadedFormsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedFormsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly verificationToken: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.healthForm
   */
  export type User$healthFormArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    where?: StudentHealthFormWhereInput
  }

  /**
   * User.uploadedForms
   */
  export type User$uploadedFormsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    where?: UploadedFormWhereInput
    orderBy?: UploadedFormOrderByWithRelationInput | UploadedFormOrderByWithRelationInput[]
    cursor?: UploadedFormWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadedFormScalarFieldEnum | UploadedFormScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    email: string | null
    expires: Date | null
    createdAt: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    email: string | null
    expires: Date | null
    createdAt: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    id: number
    token: number
    email: number
    expires: number
    createdAt: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    id?: true
    token?: true
    email?: true
    expires?: true
    createdAt?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    id?: true
    token?: true
    email?: true
    expires?: true
    createdAt?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    id?: true
    token?: true
    email?: true
    expires?: true
    createdAt?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    id: string
    token: string
    email: string
    expires: Date
    createdAt: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    email?: boolean
    expires?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    email?: boolean
    expires?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    email?: boolean
    expires?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    id?: boolean
    token?: boolean
    email?: boolean
    expires?: boolean
    createdAt?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "email" | "expires" | "createdAt", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      email: string
      expires: Date
      createdAt: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly id: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly email: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
    readonly createdAt: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model StudentHealthForm
   */

  export type AggregateStudentHealthForm = {
    _count: StudentHealthFormCountAggregateOutputType | null
    _min: StudentHealthFormMinAggregateOutputType | null
    _max: StudentHealthFormMaxAggregateOutputType | null
  }

  export type StudentHealthFormMinAggregateOutputType = {
    id: string | null
    userId: string | null
    lastName: string | null
    firstName: string | null
    middleInitial: string | null
    birthdate: Date | null
    gender: string | null
    birthPlace: string | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    guardianName: string | null
    guardianContact: string | null
    emergencyContact: string | null
    relationship: string | null
    emergencyNumber: string | null
    pastIllnesses: string | null
    hospitalization: string | null
    bloodType: string | null
    allergies: boolean | null
    immunized: boolean | null
    communicableDisease: boolean | null
    asthmatic: boolean | null
    chronicIllness: boolean | null
    hiking: boolean | null
    dancing: boolean | null
    swimming: boolean | null
    basketball: boolean | null
    ballgames: boolean | null
    jogging: boolean | null
    football: boolean | null
    badminton: boolean | null
    calisthenics: boolean | null
    wallclimbing: boolean | null
    notFitActivities: string | null
    medicationPermission: boolean | null
    signaturePath: string | null
    dateSigned: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentHealthFormMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    lastName: string | null
    firstName: string | null
    middleInitial: string | null
    birthdate: Date | null
    gender: string | null
    birthPlace: string | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    guardianName: string | null
    guardianContact: string | null
    emergencyContact: string | null
    relationship: string | null
    emergencyNumber: string | null
    pastIllnesses: string | null
    hospitalization: string | null
    bloodType: string | null
    allergies: boolean | null
    immunized: boolean | null
    communicableDisease: boolean | null
    asthmatic: boolean | null
    chronicIllness: boolean | null
    hiking: boolean | null
    dancing: boolean | null
    swimming: boolean | null
    basketball: boolean | null
    ballgames: boolean | null
    jogging: boolean | null
    football: boolean | null
    badminton: boolean | null
    calisthenics: boolean | null
    wallclimbing: boolean | null
    notFitActivities: string | null
    medicationPermission: boolean | null
    signaturePath: string | null
    dateSigned: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentHealthFormCountAggregateOutputType = {
    id: number
    userId: number
    lastName: number
    firstName: number
    middleInitial: number
    birthdate: number
    gender: number
    birthPlace: number
    addressLine1: number
    addressLine2: number
    city: number
    state: number
    postalCode: number
    guardianName: number
    guardianContact: number
    emergencyContact: number
    relationship: number
    emergencyNumber: number
    pastIllnesses: number
    hospitalization: number
    bloodType: number
    allergies: number
    immunized: number
    communicableDisease: number
    asthmatic: number
    chronicIllness: number
    hiking: number
    dancing: number
    swimming: number
    basketball: number
    ballgames: number
    jogging: number
    football: number
    badminton: number
    calisthenics: number
    wallclimbing: number
    notFitActivities: number
    medicationPermission: number
    signaturePath: number
    dateSigned: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentHealthFormMinAggregateInputType = {
    id?: true
    userId?: true
    lastName?: true
    firstName?: true
    middleInitial?: true
    birthdate?: true
    gender?: true
    birthPlace?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    postalCode?: true
    guardianName?: true
    guardianContact?: true
    emergencyContact?: true
    relationship?: true
    emergencyNumber?: true
    pastIllnesses?: true
    hospitalization?: true
    bloodType?: true
    allergies?: true
    immunized?: true
    communicableDisease?: true
    asthmatic?: true
    chronicIllness?: true
    hiking?: true
    dancing?: true
    swimming?: true
    basketball?: true
    ballgames?: true
    jogging?: true
    football?: true
    badminton?: true
    calisthenics?: true
    wallclimbing?: true
    notFitActivities?: true
    medicationPermission?: true
    signaturePath?: true
    dateSigned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentHealthFormMaxAggregateInputType = {
    id?: true
    userId?: true
    lastName?: true
    firstName?: true
    middleInitial?: true
    birthdate?: true
    gender?: true
    birthPlace?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    postalCode?: true
    guardianName?: true
    guardianContact?: true
    emergencyContact?: true
    relationship?: true
    emergencyNumber?: true
    pastIllnesses?: true
    hospitalization?: true
    bloodType?: true
    allergies?: true
    immunized?: true
    communicableDisease?: true
    asthmatic?: true
    chronicIllness?: true
    hiking?: true
    dancing?: true
    swimming?: true
    basketball?: true
    ballgames?: true
    jogging?: true
    football?: true
    badminton?: true
    calisthenics?: true
    wallclimbing?: true
    notFitActivities?: true
    medicationPermission?: true
    signaturePath?: true
    dateSigned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentHealthFormCountAggregateInputType = {
    id?: true
    userId?: true
    lastName?: true
    firstName?: true
    middleInitial?: true
    birthdate?: true
    gender?: true
    birthPlace?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    postalCode?: true
    guardianName?: true
    guardianContact?: true
    emergencyContact?: true
    relationship?: true
    emergencyNumber?: true
    pastIllnesses?: true
    hospitalization?: true
    bloodType?: true
    allergies?: true
    immunized?: true
    communicableDisease?: true
    asthmatic?: true
    chronicIllness?: true
    hiking?: true
    dancing?: true
    swimming?: true
    basketball?: true
    ballgames?: true
    jogging?: true
    football?: true
    badminton?: true
    calisthenics?: true
    wallclimbing?: true
    notFitActivities?: true
    medicationPermission?: true
    signaturePath?: true
    dateSigned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentHealthFormAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentHealthForm to aggregate.
     */
    where?: StudentHealthFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentHealthForms to fetch.
     */
    orderBy?: StudentHealthFormOrderByWithRelationInput | StudentHealthFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentHealthFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentHealthForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentHealthForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentHealthForms
    **/
    _count?: true | StudentHealthFormCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentHealthFormMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentHealthFormMaxAggregateInputType
  }

  export type GetStudentHealthFormAggregateType<T extends StudentHealthFormAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentHealthForm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentHealthForm[P]>
      : GetScalarType<T[P], AggregateStudentHealthForm[P]>
  }




  export type StudentHealthFormGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentHealthFormWhereInput
    orderBy?: StudentHealthFormOrderByWithAggregationInput | StudentHealthFormOrderByWithAggregationInput[]
    by: StudentHealthFormScalarFieldEnum[] | StudentHealthFormScalarFieldEnum
    having?: StudentHealthFormScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentHealthFormCountAggregateInputType | true
    _min?: StudentHealthFormMinAggregateInputType
    _max?: StudentHealthFormMaxAggregateInputType
  }

  export type StudentHealthFormGroupByOutputType = {
    id: string
    userId: string
    lastName: string
    firstName: string
    middleInitial: string | null
    birthdate: Date
    gender: string
    birthPlace: string
    addressLine1: string
    addressLine2: string | null
    city: string
    state: string
    postalCode: string
    guardianName: string
    guardianContact: string
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    pastIllnesses: string | null
    hospitalization: string | null
    bloodType: string
    allergies: boolean
    immunized: boolean
    communicableDisease: boolean
    asthmatic: boolean
    chronicIllness: boolean
    hiking: boolean
    dancing: boolean
    swimming: boolean
    basketball: boolean
    ballgames: boolean
    jogging: boolean
    football: boolean
    badminton: boolean
    calisthenics: boolean
    wallclimbing: boolean
    notFitActivities: string | null
    medicationPermission: boolean
    signaturePath: string
    dateSigned: Date
    createdAt: Date
    updatedAt: Date
    _count: StudentHealthFormCountAggregateOutputType | null
    _min: StudentHealthFormMinAggregateOutputType | null
    _max: StudentHealthFormMaxAggregateOutputType | null
  }

  type GetStudentHealthFormGroupByPayload<T extends StudentHealthFormGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentHealthFormGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentHealthFormGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentHealthFormGroupByOutputType[P]>
            : GetScalarType<T[P], StudentHealthFormGroupByOutputType[P]>
        }
      >
    >


  export type StudentHealthFormSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lastName?: boolean
    firstName?: boolean
    middleInitial?: boolean
    birthdate?: boolean
    gender?: boolean
    birthPlace?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    guardianName?: boolean
    guardianContact?: boolean
    emergencyContact?: boolean
    relationship?: boolean
    emergencyNumber?: boolean
    pastIllnesses?: boolean
    hospitalization?: boolean
    bloodType?: boolean
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: boolean
    medicationPermission?: boolean
    signaturePath?: boolean
    dateSigned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentHealthForm"]>

  export type StudentHealthFormSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lastName?: boolean
    firstName?: boolean
    middleInitial?: boolean
    birthdate?: boolean
    gender?: boolean
    birthPlace?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    guardianName?: boolean
    guardianContact?: boolean
    emergencyContact?: boolean
    relationship?: boolean
    emergencyNumber?: boolean
    pastIllnesses?: boolean
    hospitalization?: boolean
    bloodType?: boolean
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: boolean
    medicationPermission?: boolean
    signaturePath?: boolean
    dateSigned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentHealthForm"]>

  export type StudentHealthFormSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    lastName?: boolean
    firstName?: boolean
    middleInitial?: boolean
    birthdate?: boolean
    gender?: boolean
    birthPlace?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    guardianName?: boolean
    guardianContact?: boolean
    emergencyContact?: boolean
    relationship?: boolean
    emergencyNumber?: boolean
    pastIllnesses?: boolean
    hospitalization?: boolean
    bloodType?: boolean
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: boolean
    medicationPermission?: boolean
    signaturePath?: boolean
    dateSigned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentHealthForm"]>

  export type StudentHealthFormSelectScalar = {
    id?: boolean
    userId?: boolean
    lastName?: boolean
    firstName?: boolean
    middleInitial?: boolean
    birthdate?: boolean
    gender?: boolean
    birthPlace?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    guardianName?: boolean
    guardianContact?: boolean
    emergencyContact?: boolean
    relationship?: boolean
    emergencyNumber?: boolean
    pastIllnesses?: boolean
    hospitalization?: boolean
    bloodType?: boolean
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: boolean
    medicationPermission?: boolean
    signaturePath?: boolean
    dateSigned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentHealthFormOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "lastName" | "firstName" | "middleInitial" | "birthdate" | "gender" | "birthPlace" | "addressLine1" | "addressLine2" | "city" | "state" | "postalCode" | "guardianName" | "guardianContact" | "emergencyContact" | "relationship" | "emergencyNumber" | "pastIllnesses" | "hospitalization" | "bloodType" | "allergies" | "immunized" | "communicableDisease" | "asthmatic" | "chronicIllness" | "hiking" | "dancing" | "swimming" | "basketball" | "ballgames" | "jogging" | "football" | "badminton" | "calisthenics" | "wallclimbing" | "notFitActivities" | "medicationPermission" | "signaturePath" | "dateSigned" | "createdAt" | "updatedAt", ExtArgs["result"]["studentHealthForm"]>
  export type StudentHealthFormInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StudentHealthFormIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StudentHealthFormIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StudentHealthFormPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentHealthForm"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      lastName: string
      firstName: string
      middleInitial: string | null
      birthdate: Date
      gender: string
      birthPlace: string
      addressLine1: string
      addressLine2: string | null
      city: string
      state: string
      postalCode: string
      guardianName: string
      guardianContact: string
      emergencyContact: string
      relationship: string
      emergencyNumber: string
      pastIllnesses: string | null
      hospitalization: string | null
      bloodType: string
      allergies: boolean
      immunized: boolean
      communicableDisease: boolean
      asthmatic: boolean
      chronicIllness: boolean
      hiking: boolean
      dancing: boolean
      swimming: boolean
      basketball: boolean
      ballgames: boolean
      jogging: boolean
      football: boolean
      badminton: boolean
      calisthenics: boolean
      wallclimbing: boolean
      notFitActivities: string | null
      medicationPermission: boolean
      signaturePath: string
      dateSigned: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["studentHealthForm"]>
    composites: {}
  }

  type StudentHealthFormGetPayload<S extends boolean | null | undefined | StudentHealthFormDefaultArgs> = $Result.GetResult<Prisma.$StudentHealthFormPayload, S>

  type StudentHealthFormCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentHealthFormFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentHealthFormCountAggregateInputType | true
    }

  export interface StudentHealthFormDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentHealthForm'], meta: { name: 'StudentHealthForm' } }
    /**
     * Find zero or one StudentHealthForm that matches the filter.
     * @param {StudentHealthFormFindUniqueArgs} args - Arguments to find a StudentHealthForm
     * @example
     * // Get one StudentHealthForm
     * const studentHealthForm = await prisma.studentHealthForm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentHealthFormFindUniqueArgs>(args: SelectSubset<T, StudentHealthFormFindUniqueArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentHealthForm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentHealthFormFindUniqueOrThrowArgs} args - Arguments to find a StudentHealthForm
     * @example
     * // Get one StudentHealthForm
     * const studentHealthForm = await prisma.studentHealthForm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentHealthFormFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentHealthFormFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentHealthForm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentHealthFormFindFirstArgs} args - Arguments to find a StudentHealthForm
     * @example
     * // Get one StudentHealthForm
     * const studentHealthForm = await prisma.studentHealthForm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentHealthFormFindFirstArgs>(args?: SelectSubset<T, StudentHealthFormFindFirstArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentHealthForm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentHealthFormFindFirstOrThrowArgs} args - Arguments to find a StudentHealthForm
     * @example
     * // Get one StudentHealthForm
     * const studentHealthForm = await prisma.studentHealthForm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentHealthFormFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentHealthFormFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentHealthForms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentHealthFormFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentHealthForms
     * const studentHealthForms = await prisma.studentHealthForm.findMany()
     * 
     * // Get first 10 StudentHealthForms
     * const studentHealthForms = await prisma.studentHealthForm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentHealthFormWithIdOnly = await prisma.studentHealthForm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentHealthFormFindManyArgs>(args?: SelectSubset<T, StudentHealthFormFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentHealthForm.
     * @param {StudentHealthFormCreateArgs} args - Arguments to create a StudentHealthForm.
     * @example
     * // Create one StudentHealthForm
     * const StudentHealthForm = await prisma.studentHealthForm.create({
     *   data: {
     *     // ... data to create a StudentHealthForm
     *   }
     * })
     * 
     */
    create<T extends StudentHealthFormCreateArgs>(args: SelectSubset<T, StudentHealthFormCreateArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentHealthForms.
     * @param {StudentHealthFormCreateManyArgs} args - Arguments to create many StudentHealthForms.
     * @example
     * // Create many StudentHealthForms
     * const studentHealthForm = await prisma.studentHealthForm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentHealthFormCreateManyArgs>(args?: SelectSubset<T, StudentHealthFormCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentHealthForms and returns the data saved in the database.
     * @param {StudentHealthFormCreateManyAndReturnArgs} args - Arguments to create many StudentHealthForms.
     * @example
     * // Create many StudentHealthForms
     * const studentHealthForm = await prisma.studentHealthForm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentHealthForms and only return the `id`
     * const studentHealthFormWithIdOnly = await prisma.studentHealthForm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentHealthFormCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentHealthFormCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentHealthForm.
     * @param {StudentHealthFormDeleteArgs} args - Arguments to delete one StudentHealthForm.
     * @example
     * // Delete one StudentHealthForm
     * const StudentHealthForm = await prisma.studentHealthForm.delete({
     *   where: {
     *     // ... filter to delete one StudentHealthForm
     *   }
     * })
     * 
     */
    delete<T extends StudentHealthFormDeleteArgs>(args: SelectSubset<T, StudentHealthFormDeleteArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentHealthForm.
     * @param {StudentHealthFormUpdateArgs} args - Arguments to update one StudentHealthForm.
     * @example
     * // Update one StudentHealthForm
     * const studentHealthForm = await prisma.studentHealthForm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentHealthFormUpdateArgs>(args: SelectSubset<T, StudentHealthFormUpdateArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentHealthForms.
     * @param {StudentHealthFormDeleteManyArgs} args - Arguments to filter StudentHealthForms to delete.
     * @example
     * // Delete a few StudentHealthForms
     * const { count } = await prisma.studentHealthForm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentHealthFormDeleteManyArgs>(args?: SelectSubset<T, StudentHealthFormDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentHealthForms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentHealthFormUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentHealthForms
     * const studentHealthForm = await prisma.studentHealthForm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentHealthFormUpdateManyArgs>(args: SelectSubset<T, StudentHealthFormUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentHealthForms and returns the data updated in the database.
     * @param {StudentHealthFormUpdateManyAndReturnArgs} args - Arguments to update many StudentHealthForms.
     * @example
     * // Update many StudentHealthForms
     * const studentHealthForm = await prisma.studentHealthForm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentHealthForms and only return the `id`
     * const studentHealthFormWithIdOnly = await prisma.studentHealthForm.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentHealthFormUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentHealthFormUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentHealthForm.
     * @param {StudentHealthFormUpsertArgs} args - Arguments to update or create a StudentHealthForm.
     * @example
     * // Update or create a StudentHealthForm
     * const studentHealthForm = await prisma.studentHealthForm.upsert({
     *   create: {
     *     // ... data to create a StudentHealthForm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentHealthForm we want to update
     *   }
     * })
     */
    upsert<T extends StudentHealthFormUpsertArgs>(args: SelectSubset<T, StudentHealthFormUpsertArgs<ExtArgs>>): Prisma__StudentHealthFormClient<$Result.GetResult<Prisma.$StudentHealthFormPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentHealthForms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentHealthFormCountArgs} args - Arguments to filter StudentHealthForms to count.
     * @example
     * // Count the number of StudentHealthForms
     * const count = await prisma.studentHealthForm.count({
     *   where: {
     *     // ... the filter for the StudentHealthForms we want to count
     *   }
     * })
    **/
    count<T extends StudentHealthFormCountArgs>(
      args?: Subset<T, StudentHealthFormCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentHealthFormCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentHealthForm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentHealthFormAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentHealthFormAggregateArgs>(args: Subset<T, StudentHealthFormAggregateArgs>): Prisma.PrismaPromise<GetStudentHealthFormAggregateType<T>>

    /**
     * Group by StudentHealthForm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentHealthFormGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentHealthFormGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentHealthFormGroupByArgs['orderBy'] }
        : { orderBy?: StudentHealthFormGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentHealthFormGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentHealthFormGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentHealthForm model
   */
  readonly fields: StudentHealthFormFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentHealthForm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentHealthFormClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentHealthForm model
   */
  interface StudentHealthFormFieldRefs {
    readonly id: FieldRef<"StudentHealthForm", 'String'>
    readonly userId: FieldRef<"StudentHealthForm", 'String'>
    readonly lastName: FieldRef<"StudentHealthForm", 'String'>
    readonly firstName: FieldRef<"StudentHealthForm", 'String'>
    readonly middleInitial: FieldRef<"StudentHealthForm", 'String'>
    readonly birthdate: FieldRef<"StudentHealthForm", 'DateTime'>
    readonly gender: FieldRef<"StudentHealthForm", 'String'>
    readonly birthPlace: FieldRef<"StudentHealthForm", 'String'>
    readonly addressLine1: FieldRef<"StudentHealthForm", 'String'>
    readonly addressLine2: FieldRef<"StudentHealthForm", 'String'>
    readonly city: FieldRef<"StudentHealthForm", 'String'>
    readonly state: FieldRef<"StudentHealthForm", 'String'>
    readonly postalCode: FieldRef<"StudentHealthForm", 'String'>
    readonly guardianName: FieldRef<"StudentHealthForm", 'String'>
    readonly guardianContact: FieldRef<"StudentHealthForm", 'String'>
    readonly emergencyContact: FieldRef<"StudentHealthForm", 'String'>
    readonly relationship: FieldRef<"StudentHealthForm", 'String'>
    readonly emergencyNumber: FieldRef<"StudentHealthForm", 'String'>
    readonly pastIllnesses: FieldRef<"StudentHealthForm", 'String'>
    readonly hospitalization: FieldRef<"StudentHealthForm", 'String'>
    readonly bloodType: FieldRef<"StudentHealthForm", 'String'>
    readonly allergies: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly immunized: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly communicableDisease: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly asthmatic: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly chronicIllness: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly hiking: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly dancing: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly swimming: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly basketball: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly ballgames: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly jogging: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly football: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly badminton: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly calisthenics: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly wallclimbing: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly notFitActivities: FieldRef<"StudentHealthForm", 'String'>
    readonly medicationPermission: FieldRef<"StudentHealthForm", 'Boolean'>
    readonly signaturePath: FieldRef<"StudentHealthForm", 'String'>
    readonly dateSigned: FieldRef<"StudentHealthForm", 'DateTime'>
    readonly createdAt: FieldRef<"StudentHealthForm", 'DateTime'>
    readonly updatedAt: FieldRef<"StudentHealthForm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentHealthForm findUnique
   */
  export type StudentHealthFormFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which StudentHealthForm to fetch.
     */
    where: StudentHealthFormWhereUniqueInput
  }

  /**
   * StudentHealthForm findUniqueOrThrow
   */
  export type StudentHealthFormFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which StudentHealthForm to fetch.
     */
    where: StudentHealthFormWhereUniqueInput
  }

  /**
   * StudentHealthForm findFirst
   */
  export type StudentHealthFormFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which StudentHealthForm to fetch.
     */
    where?: StudentHealthFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentHealthForms to fetch.
     */
    orderBy?: StudentHealthFormOrderByWithRelationInput | StudentHealthFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentHealthForms.
     */
    cursor?: StudentHealthFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentHealthForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentHealthForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentHealthForms.
     */
    distinct?: StudentHealthFormScalarFieldEnum | StudentHealthFormScalarFieldEnum[]
  }

  /**
   * StudentHealthForm findFirstOrThrow
   */
  export type StudentHealthFormFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which StudentHealthForm to fetch.
     */
    where?: StudentHealthFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentHealthForms to fetch.
     */
    orderBy?: StudentHealthFormOrderByWithRelationInput | StudentHealthFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentHealthForms.
     */
    cursor?: StudentHealthFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentHealthForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentHealthForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentHealthForms.
     */
    distinct?: StudentHealthFormScalarFieldEnum | StudentHealthFormScalarFieldEnum[]
  }

  /**
   * StudentHealthForm findMany
   */
  export type StudentHealthFormFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which StudentHealthForms to fetch.
     */
    where?: StudentHealthFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentHealthForms to fetch.
     */
    orderBy?: StudentHealthFormOrderByWithRelationInput | StudentHealthFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentHealthForms.
     */
    cursor?: StudentHealthFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentHealthForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentHealthForms.
     */
    skip?: number
    distinct?: StudentHealthFormScalarFieldEnum | StudentHealthFormScalarFieldEnum[]
  }

  /**
   * StudentHealthForm create
   */
  export type StudentHealthFormCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentHealthForm.
     */
    data: XOR<StudentHealthFormCreateInput, StudentHealthFormUncheckedCreateInput>
  }

  /**
   * StudentHealthForm createMany
   */
  export type StudentHealthFormCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentHealthForms.
     */
    data: StudentHealthFormCreateManyInput | StudentHealthFormCreateManyInput[]
  }

  /**
   * StudentHealthForm createManyAndReturn
   */
  export type StudentHealthFormCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * The data used to create many StudentHealthForms.
     */
    data: StudentHealthFormCreateManyInput | StudentHealthFormCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentHealthForm update
   */
  export type StudentHealthFormUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentHealthForm.
     */
    data: XOR<StudentHealthFormUpdateInput, StudentHealthFormUncheckedUpdateInput>
    /**
     * Choose, which StudentHealthForm to update.
     */
    where: StudentHealthFormWhereUniqueInput
  }

  /**
   * StudentHealthForm updateMany
   */
  export type StudentHealthFormUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentHealthForms.
     */
    data: XOR<StudentHealthFormUpdateManyMutationInput, StudentHealthFormUncheckedUpdateManyInput>
    /**
     * Filter which StudentHealthForms to update
     */
    where?: StudentHealthFormWhereInput
    /**
     * Limit how many StudentHealthForms to update.
     */
    limit?: number
  }

  /**
   * StudentHealthForm updateManyAndReturn
   */
  export type StudentHealthFormUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * The data used to update StudentHealthForms.
     */
    data: XOR<StudentHealthFormUpdateManyMutationInput, StudentHealthFormUncheckedUpdateManyInput>
    /**
     * Filter which StudentHealthForms to update
     */
    where?: StudentHealthFormWhereInput
    /**
     * Limit how many StudentHealthForms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentHealthForm upsert
   */
  export type StudentHealthFormUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentHealthForm to update in case it exists.
     */
    where: StudentHealthFormWhereUniqueInput
    /**
     * In case the StudentHealthForm found by the `where` argument doesn't exist, create a new StudentHealthForm with this data.
     */
    create: XOR<StudentHealthFormCreateInput, StudentHealthFormUncheckedCreateInput>
    /**
     * In case the StudentHealthForm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentHealthFormUpdateInput, StudentHealthFormUncheckedUpdateInput>
  }

  /**
   * StudentHealthForm delete
   */
  export type StudentHealthFormDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
    /**
     * Filter which StudentHealthForm to delete.
     */
    where: StudentHealthFormWhereUniqueInput
  }

  /**
   * StudentHealthForm deleteMany
   */
  export type StudentHealthFormDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentHealthForms to delete
     */
    where?: StudentHealthFormWhereInput
    /**
     * Limit how many StudentHealthForms to delete.
     */
    limit?: number
  }

  /**
   * StudentHealthForm without action
   */
  export type StudentHealthFormDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentHealthForm
     */
    select?: StudentHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentHealthForm
     */
    omit?: StudentHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentHealthFormInclude<ExtArgs> | null
  }


  /**
   * Model UploadedForm
   */

  export type AggregateUploadedForm = {
    _count: UploadedFormCountAggregateOutputType | null
    _min: UploadedFormMinAggregateOutputType | null
    _max: UploadedFormMaxAggregateOutputType | null
  }

  export type UploadedFormMinAggregateOutputType = {
    id: string | null
    userId: string | null
    formType: string | null
    filePath: string | null
    notes: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UploadedFormMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    formType: string | null
    filePath: string | null
    notes: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UploadedFormCountAggregateOutputType = {
    id: number
    userId: number
    formType: number
    filePath: number
    notes: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UploadedFormMinAggregateInputType = {
    id?: true
    userId?: true
    formType?: true
    filePath?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UploadedFormMaxAggregateInputType = {
    id?: true
    userId?: true
    formType?: true
    filePath?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UploadedFormCountAggregateInputType = {
    id?: true
    userId?: true
    formType?: true
    filePath?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UploadedFormAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedForm to aggregate.
     */
    where?: UploadedFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedForms to fetch.
     */
    orderBy?: UploadedFormOrderByWithRelationInput | UploadedFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadedFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadedForms
    **/
    _count?: true | UploadedFormCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadedFormMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadedFormMaxAggregateInputType
  }

  export type GetUploadedFormAggregateType<T extends UploadedFormAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadedForm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadedForm[P]>
      : GetScalarType<T[P], AggregateUploadedForm[P]>
  }




  export type UploadedFormGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadedFormWhereInput
    orderBy?: UploadedFormOrderByWithAggregationInput | UploadedFormOrderByWithAggregationInput[]
    by: UploadedFormScalarFieldEnum[] | UploadedFormScalarFieldEnum
    having?: UploadedFormScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadedFormCountAggregateInputType | true
    _min?: UploadedFormMinAggregateInputType
    _max?: UploadedFormMaxAggregateInputType
  }

  export type UploadedFormGroupByOutputType = {
    id: string
    userId: string
    formType: string
    filePath: string
    notes: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: UploadedFormCountAggregateOutputType | null
    _min: UploadedFormMinAggregateOutputType | null
    _max: UploadedFormMaxAggregateOutputType | null
  }

  type GetUploadedFormGroupByPayload<T extends UploadedFormGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadedFormGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadedFormGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadedFormGroupByOutputType[P]>
            : GetScalarType<T[P], UploadedFormGroupByOutputType[P]>
        }
      >
    >


  export type UploadedFormSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    formType?: boolean
    filePath?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedForm"]>

  export type UploadedFormSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    formType?: boolean
    filePath?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedForm"]>

  export type UploadedFormSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    formType?: boolean
    filePath?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedForm"]>

  export type UploadedFormSelectScalar = {
    id?: boolean
    userId?: boolean
    formType?: boolean
    filePath?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UploadedFormOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "formType" | "filePath" | "notes" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["uploadedForm"]>
  export type UploadedFormInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UploadedFormIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UploadedFormIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UploadedFormPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadedForm"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      formType: string
      filePath: string
      notes: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["uploadedForm"]>
    composites: {}
  }

  type UploadedFormGetPayload<S extends boolean | null | undefined | UploadedFormDefaultArgs> = $Result.GetResult<Prisma.$UploadedFormPayload, S>

  type UploadedFormCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UploadedFormFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadedFormCountAggregateInputType | true
    }

  export interface UploadedFormDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadedForm'], meta: { name: 'UploadedForm' } }
    /**
     * Find zero or one UploadedForm that matches the filter.
     * @param {UploadedFormFindUniqueArgs} args - Arguments to find a UploadedForm
     * @example
     * // Get one UploadedForm
     * const uploadedForm = await prisma.uploadedForm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadedFormFindUniqueArgs>(args: SelectSubset<T, UploadedFormFindUniqueArgs<ExtArgs>>): Prisma__UploadedFormClient<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UploadedForm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadedFormFindUniqueOrThrowArgs} args - Arguments to find a UploadedForm
     * @example
     * // Get one UploadedForm
     * const uploadedForm = await prisma.uploadedForm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadedFormFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadedFormFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadedFormClient<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedForm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFormFindFirstArgs} args - Arguments to find a UploadedForm
     * @example
     * // Get one UploadedForm
     * const uploadedForm = await prisma.uploadedForm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadedFormFindFirstArgs>(args?: SelectSubset<T, UploadedFormFindFirstArgs<ExtArgs>>): Prisma__UploadedFormClient<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedForm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFormFindFirstOrThrowArgs} args - Arguments to find a UploadedForm
     * @example
     * // Get one UploadedForm
     * const uploadedForm = await prisma.uploadedForm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadedFormFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadedFormFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadedFormClient<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UploadedForms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFormFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadedForms
     * const uploadedForms = await prisma.uploadedForm.findMany()
     * 
     * // Get first 10 UploadedForms
     * const uploadedForms = await prisma.uploadedForm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadedFormWithIdOnly = await prisma.uploadedForm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadedFormFindManyArgs>(args?: SelectSubset<T, UploadedFormFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UploadedForm.
     * @param {UploadedFormCreateArgs} args - Arguments to create a UploadedForm.
     * @example
     * // Create one UploadedForm
     * const UploadedForm = await prisma.uploadedForm.create({
     *   data: {
     *     // ... data to create a UploadedForm
     *   }
     * })
     * 
     */
    create<T extends UploadedFormCreateArgs>(args: SelectSubset<T, UploadedFormCreateArgs<ExtArgs>>): Prisma__UploadedFormClient<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UploadedForms.
     * @param {UploadedFormCreateManyArgs} args - Arguments to create many UploadedForms.
     * @example
     * // Create many UploadedForms
     * const uploadedForm = await prisma.uploadedForm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadedFormCreateManyArgs>(args?: SelectSubset<T, UploadedFormCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UploadedForms and returns the data saved in the database.
     * @param {UploadedFormCreateManyAndReturnArgs} args - Arguments to create many UploadedForms.
     * @example
     * // Create many UploadedForms
     * const uploadedForm = await prisma.uploadedForm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UploadedForms and only return the `id`
     * const uploadedFormWithIdOnly = await prisma.uploadedForm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UploadedFormCreateManyAndReturnArgs>(args?: SelectSubset<T, UploadedFormCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UploadedForm.
     * @param {UploadedFormDeleteArgs} args - Arguments to delete one UploadedForm.
     * @example
     * // Delete one UploadedForm
     * const UploadedForm = await prisma.uploadedForm.delete({
     *   where: {
     *     // ... filter to delete one UploadedForm
     *   }
     * })
     * 
     */
    delete<T extends UploadedFormDeleteArgs>(args: SelectSubset<T, UploadedFormDeleteArgs<ExtArgs>>): Prisma__UploadedFormClient<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UploadedForm.
     * @param {UploadedFormUpdateArgs} args - Arguments to update one UploadedForm.
     * @example
     * // Update one UploadedForm
     * const uploadedForm = await prisma.uploadedForm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadedFormUpdateArgs>(args: SelectSubset<T, UploadedFormUpdateArgs<ExtArgs>>): Prisma__UploadedFormClient<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UploadedForms.
     * @param {UploadedFormDeleteManyArgs} args - Arguments to filter UploadedForms to delete.
     * @example
     * // Delete a few UploadedForms
     * const { count } = await prisma.uploadedForm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadedFormDeleteManyArgs>(args?: SelectSubset<T, UploadedFormDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedForms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFormUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadedForms
     * const uploadedForm = await prisma.uploadedForm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadedFormUpdateManyArgs>(args: SelectSubset<T, UploadedFormUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedForms and returns the data updated in the database.
     * @param {UploadedFormUpdateManyAndReturnArgs} args - Arguments to update many UploadedForms.
     * @example
     * // Update many UploadedForms
     * const uploadedForm = await prisma.uploadedForm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UploadedForms and only return the `id`
     * const uploadedFormWithIdOnly = await prisma.uploadedForm.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UploadedFormUpdateManyAndReturnArgs>(args: SelectSubset<T, UploadedFormUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UploadedForm.
     * @param {UploadedFormUpsertArgs} args - Arguments to update or create a UploadedForm.
     * @example
     * // Update or create a UploadedForm
     * const uploadedForm = await prisma.uploadedForm.upsert({
     *   create: {
     *     // ... data to create a UploadedForm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadedForm we want to update
     *   }
     * })
     */
    upsert<T extends UploadedFormUpsertArgs>(args: SelectSubset<T, UploadedFormUpsertArgs<ExtArgs>>): Prisma__UploadedFormClient<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UploadedForms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFormCountArgs} args - Arguments to filter UploadedForms to count.
     * @example
     * // Count the number of UploadedForms
     * const count = await prisma.uploadedForm.count({
     *   where: {
     *     // ... the filter for the UploadedForms we want to count
     *   }
     * })
    **/
    count<T extends UploadedFormCountArgs>(
      args?: Subset<T, UploadedFormCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadedFormCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadedForm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFormAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UploadedFormAggregateArgs>(args: Subset<T, UploadedFormAggregateArgs>): Prisma.PrismaPromise<GetUploadedFormAggregateType<T>>

    /**
     * Group by UploadedForm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFormGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UploadedFormGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadedFormGroupByArgs['orderBy'] }
        : { orderBy?: UploadedFormGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UploadedFormGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadedFormGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadedForm model
   */
  readonly fields: UploadedFormFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadedForm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadedFormClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UploadedForm model
   */
  interface UploadedFormFieldRefs {
    readonly id: FieldRef<"UploadedForm", 'String'>
    readonly userId: FieldRef<"UploadedForm", 'String'>
    readonly formType: FieldRef<"UploadedForm", 'String'>
    readonly filePath: FieldRef<"UploadedForm", 'String'>
    readonly notes: FieldRef<"UploadedForm", 'String'>
    readonly status: FieldRef<"UploadedForm", 'String'>
    readonly createdAt: FieldRef<"UploadedForm", 'DateTime'>
    readonly updatedAt: FieldRef<"UploadedForm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UploadedForm findUnique
   */
  export type UploadedFormFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * Filter, which UploadedForm to fetch.
     */
    where: UploadedFormWhereUniqueInput
  }

  /**
   * UploadedForm findUniqueOrThrow
   */
  export type UploadedFormFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * Filter, which UploadedForm to fetch.
     */
    where: UploadedFormWhereUniqueInput
  }

  /**
   * UploadedForm findFirst
   */
  export type UploadedFormFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * Filter, which UploadedForm to fetch.
     */
    where?: UploadedFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedForms to fetch.
     */
    orderBy?: UploadedFormOrderByWithRelationInput | UploadedFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedForms.
     */
    cursor?: UploadedFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedForms.
     */
    distinct?: UploadedFormScalarFieldEnum | UploadedFormScalarFieldEnum[]
  }

  /**
   * UploadedForm findFirstOrThrow
   */
  export type UploadedFormFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * Filter, which UploadedForm to fetch.
     */
    where?: UploadedFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedForms to fetch.
     */
    orderBy?: UploadedFormOrderByWithRelationInput | UploadedFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedForms.
     */
    cursor?: UploadedFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedForms.
     */
    distinct?: UploadedFormScalarFieldEnum | UploadedFormScalarFieldEnum[]
  }

  /**
   * UploadedForm findMany
   */
  export type UploadedFormFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * Filter, which UploadedForms to fetch.
     */
    where?: UploadedFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedForms to fetch.
     */
    orderBy?: UploadedFormOrderByWithRelationInput | UploadedFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadedForms.
     */
    cursor?: UploadedFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedForms.
     */
    skip?: number
    distinct?: UploadedFormScalarFieldEnum | UploadedFormScalarFieldEnum[]
  }

  /**
   * UploadedForm create
   */
  export type UploadedFormCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadedForm.
     */
    data: XOR<UploadedFormCreateInput, UploadedFormUncheckedCreateInput>
  }

  /**
   * UploadedForm createMany
   */
  export type UploadedFormCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadedForms.
     */
    data: UploadedFormCreateManyInput | UploadedFormCreateManyInput[]
  }

  /**
   * UploadedForm createManyAndReturn
   */
  export type UploadedFormCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * The data used to create many UploadedForms.
     */
    data: UploadedFormCreateManyInput | UploadedFormCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadedForm update
   */
  export type UploadedFormUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadedForm.
     */
    data: XOR<UploadedFormUpdateInput, UploadedFormUncheckedUpdateInput>
    /**
     * Choose, which UploadedForm to update.
     */
    where: UploadedFormWhereUniqueInput
  }

  /**
   * UploadedForm updateMany
   */
  export type UploadedFormUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadedForms.
     */
    data: XOR<UploadedFormUpdateManyMutationInput, UploadedFormUncheckedUpdateManyInput>
    /**
     * Filter which UploadedForms to update
     */
    where?: UploadedFormWhereInput
    /**
     * Limit how many UploadedForms to update.
     */
    limit?: number
  }

  /**
   * UploadedForm updateManyAndReturn
   */
  export type UploadedFormUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * The data used to update UploadedForms.
     */
    data: XOR<UploadedFormUpdateManyMutationInput, UploadedFormUncheckedUpdateManyInput>
    /**
     * Filter which UploadedForms to update
     */
    where?: UploadedFormWhereInput
    /**
     * Limit how many UploadedForms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadedForm upsert
   */
  export type UploadedFormUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadedForm to update in case it exists.
     */
    where: UploadedFormWhereUniqueInput
    /**
     * In case the UploadedForm found by the `where` argument doesn't exist, create a new UploadedForm with this data.
     */
    create: XOR<UploadedFormCreateInput, UploadedFormUncheckedCreateInput>
    /**
     * In case the UploadedForm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadedFormUpdateInput, UploadedFormUncheckedUpdateInput>
  }

  /**
   * UploadedForm delete
   */
  export type UploadedFormDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
    /**
     * Filter which UploadedForm to delete.
     */
    where: UploadedFormWhereUniqueInput
  }

  /**
   * UploadedForm deleteMany
   */
  export type UploadedFormDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedForms to delete
     */
    where?: UploadedFormWhereInput
    /**
     * Limit how many UploadedForms to delete.
     */
    limit?: number
  }

  /**
   * UploadedForm without action
   */
  export type UploadedFormDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedForm
     */
    select?: UploadedFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedForm
     */
    omit?: UploadedFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFormInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role',
    status: 'status',
    emailVerified: 'emailVerified',
    verificationToken: 'verificationToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    email: 'email',
    expires: 'expires',
    createdAt: 'createdAt'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const StudentHealthFormScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    lastName: 'lastName',
    firstName: 'firstName',
    middleInitial: 'middleInitial',
    birthdate: 'birthdate',
    gender: 'gender',
    birthPlace: 'birthPlace',
    addressLine1: 'addressLine1',
    addressLine2: 'addressLine2',
    city: 'city',
    state: 'state',
    postalCode: 'postalCode',
    guardianName: 'guardianName',
    guardianContact: 'guardianContact',
    emergencyContact: 'emergencyContact',
    relationship: 'relationship',
    emergencyNumber: 'emergencyNumber',
    pastIllnesses: 'pastIllnesses',
    hospitalization: 'hospitalization',
    bloodType: 'bloodType',
    allergies: 'allergies',
    immunized: 'immunized',
    communicableDisease: 'communicableDisease',
    asthmatic: 'asthmatic',
    chronicIllness: 'chronicIllness',
    hiking: 'hiking',
    dancing: 'dancing',
    swimming: 'swimming',
    basketball: 'basketball',
    ballgames: 'ballgames',
    jogging: 'jogging',
    football: 'football',
    badminton: 'badminton',
    calisthenics: 'calisthenics',
    wallclimbing: 'wallclimbing',
    notFitActivities: 'notFitActivities',
    medicationPermission: 'medicationPermission',
    signaturePath: 'signaturePath',
    dateSigned: 'dateSigned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentHealthFormScalarFieldEnum = (typeof StudentHealthFormScalarFieldEnum)[keyof typeof StudentHealthFormScalarFieldEnum]


  export const UploadedFormScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    formType: 'formType',
    filePath: 'filePath',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UploadedFormScalarFieldEnum = (typeof UploadedFormScalarFieldEnum)[keyof typeof UploadedFormScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    healthForm?: XOR<StudentHealthFormNullableScalarRelationFilter, StudentHealthFormWhereInput> | null
    uploadedForms?: UploadedFormListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    healthForm?: StudentHealthFormOrderByWithRelationInput
    uploadedForms?: UploadedFormOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    healthForm?: XOR<StudentHealthFormNullableScalarRelationFilter, StudentHealthFormWhereInput> | null
    uploadedForms?: UploadedFormListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    verificationToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    id?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    email?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    email?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    email?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "id" | "token">

  export type VerificationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    email?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    email?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type StudentHealthFormWhereInput = {
    AND?: StudentHealthFormWhereInput | StudentHealthFormWhereInput[]
    OR?: StudentHealthFormWhereInput[]
    NOT?: StudentHealthFormWhereInput | StudentHealthFormWhereInput[]
    id?: StringFilter<"StudentHealthForm"> | string
    userId?: StringFilter<"StudentHealthForm"> | string
    lastName?: StringFilter<"StudentHealthForm"> | string
    firstName?: StringFilter<"StudentHealthForm"> | string
    middleInitial?: StringNullableFilter<"StudentHealthForm"> | string | null
    birthdate?: DateTimeFilter<"StudentHealthForm"> | Date | string
    gender?: StringFilter<"StudentHealthForm"> | string
    birthPlace?: StringFilter<"StudentHealthForm"> | string
    addressLine1?: StringFilter<"StudentHealthForm"> | string
    addressLine2?: StringNullableFilter<"StudentHealthForm"> | string | null
    city?: StringFilter<"StudentHealthForm"> | string
    state?: StringFilter<"StudentHealthForm"> | string
    postalCode?: StringFilter<"StudentHealthForm"> | string
    guardianName?: StringFilter<"StudentHealthForm"> | string
    guardianContact?: StringFilter<"StudentHealthForm"> | string
    emergencyContact?: StringFilter<"StudentHealthForm"> | string
    relationship?: StringFilter<"StudentHealthForm"> | string
    emergencyNumber?: StringFilter<"StudentHealthForm"> | string
    pastIllnesses?: StringNullableFilter<"StudentHealthForm"> | string | null
    hospitalization?: StringNullableFilter<"StudentHealthForm"> | string | null
    bloodType?: StringFilter<"StudentHealthForm"> | string
    allergies?: BoolFilter<"StudentHealthForm"> | boolean
    immunized?: BoolFilter<"StudentHealthForm"> | boolean
    communicableDisease?: BoolFilter<"StudentHealthForm"> | boolean
    asthmatic?: BoolFilter<"StudentHealthForm"> | boolean
    chronicIllness?: BoolFilter<"StudentHealthForm"> | boolean
    hiking?: BoolFilter<"StudentHealthForm"> | boolean
    dancing?: BoolFilter<"StudentHealthForm"> | boolean
    swimming?: BoolFilter<"StudentHealthForm"> | boolean
    basketball?: BoolFilter<"StudentHealthForm"> | boolean
    ballgames?: BoolFilter<"StudentHealthForm"> | boolean
    jogging?: BoolFilter<"StudentHealthForm"> | boolean
    football?: BoolFilter<"StudentHealthForm"> | boolean
    badminton?: BoolFilter<"StudentHealthForm"> | boolean
    calisthenics?: BoolFilter<"StudentHealthForm"> | boolean
    wallclimbing?: BoolFilter<"StudentHealthForm"> | boolean
    notFitActivities?: StringNullableFilter<"StudentHealthForm"> | string | null
    medicationPermission?: BoolFilter<"StudentHealthForm"> | boolean
    signaturePath?: StringFilter<"StudentHealthForm"> | string
    dateSigned?: DateTimeFilter<"StudentHealthForm"> | Date | string
    createdAt?: DateTimeFilter<"StudentHealthForm"> | Date | string
    updatedAt?: DateTimeFilter<"StudentHealthForm"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type StudentHealthFormOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    middleInitial?: SortOrderInput | SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    birthPlace?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    guardianName?: SortOrder
    guardianContact?: SortOrder
    emergencyContact?: SortOrder
    relationship?: SortOrder
    emergencyNumber?: SortOrder
    pastIllnesses?: SortOrderInput | SortOrder
    hospitalization?: SortOrderInput | SortOrder
    bloodType?: SortOrder
    allergies?: SortOrder
    immunized?: SortOrder
    communicableDisease?: SortOrder
    asthmatic?: SortOrder
    chronicIllness?: SortOrder
    hiking?: SortOrder
    dancing?: SortOrder
    swimming?: SortOrder
    basketball?: SortOrder
    ballgames?: SortOrder
    jogging?: SortOrder
    football?: SortOrder
    badminton?: SortOrder
    calisthenics?: SortOrder
    wallclimbing?: SortOrder
    notFitActivities?: SortOrderInput | SortOrder
    medicationPermission?: SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type StudentHealthFormWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: StudentHealthFormWhereInput | StudentHealthFormWhereInput[]
    OR?: StudentHealthFormWhereInput[]
    NOT?: StudentHealthFormWhereInput | StudentHealthFormWhereInput[]
    lastName?: StringFilter<"StudentHealthForm"> | string
    firstName?: StringFilter<"StudentHealthForm"> | string
    middleInitial?: StringNullableFilter<"StudentHealthForm"> | string | null
    birthdate?: DateTimeFilter<"StudentHealthForm"> | Date | string
    gender?: StringFilter<"StudentHealthForm"> | string
    birthPlace?: StringFilter<"StudentHealthForm"> | string
    addressLine1?: StringFilter<"StudentHealthForm"> | string
    addressLine2?: StringNullableFilter<"StudentHealthForm"> | string | null
    city?: StringFilter<"StudentHealthForm"> | string
    state?: StringFilter<"StudentHealthForm"> | string
    postalCode?: StringFilter<"StudentHealthForm"> | string
    guardianName?: StringFilter<"StudentHealthForm"> | string
    guardianContact?: StringFilter<"StudentHealthForm"> | string
    emergencyContact?: StringFilter<"StudentHealthForm"> | string
    relationship?: StringFilter<"StudentHealthForm"> | string
    emergencyNumber?: StringFilter<"StudentHealthForm"> | string
    pastIllnesses?: StringNullableFilter<"StudentHealthForm"> | string | null
    hospitalization?: StringNullableFilter<"StudentHealthForm"> | string | null
    bloodType?: StringFilter<"StudentHealthForm"> | string
    allergies?: BoolFilter<"StudentHealthForm"> | boolean
    immunized?: BoolFilter<"StudentHealthForm"> | boolean
    communicableDisease?: BoolFilter<"StudentHealthForm"> | boolean
    asthmatic?: BoolFilter<"StudentHealthForm"> | boolean
    chronicIllness?: BoolFilter<"StudentHealthForm"> | boolean
    hiking?: BoolFilter<"StudentHealthForm"> | boolean
    dancing?: BoolFilter<"StudentHealthForm"> | boolean
    swimming?: BoolFilter<"StudentHealthForm"> | boolean
    basketball?: BoolFilter<"StudentHealthForm"> | boolean
    ballgames?: BoolFilter<"StudentHealthForm"> | boolean
    jogging?: BoolFilter<"StudentHealthForm"> | boolean
    football?: BoolFilter<"StudentHealthForm"> | boolean
    badminton?: BoolFilter<"StudentHealthForm"> | boolean
    calisthenics?: BoolFilter<"StudentHealthForm"> | boolean
    wallclimbing?: BoolFilter<"StudentHealthForm"> | boolean
    notFitActivities?: StringNullableFilter<"StudentHealthForm"> | string | null
    medicationPermission?: BoolFilter<"StudentHealthForm"> | boolean
    signaturePath?: StringFilter<"StudentHealthForm"> | string
    dateSigned?: DateTimeFilter<"StudentHealthForm"> | Date | string
    createdAt?: DateTimeFilter<"StudentHealthForm"> | Date | string
    updatedAt?: DateTimeFilter<"StudentHealthForm"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type StudentHealthFormOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    middleInitial?: SortOrderInput | SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    birthPlace?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    guardianName?: SortOrder
    guardianContact?: SortOrder
    emergencyContact?: SortOrder
    relationship?: SortOrder
    emergencyNumber?: SortOrder
    pastIllnesses?: SortOrderInput | SortOrder
    hospitalization?: SortOrderInput | SortOrder
    bloodType?: SortOrder
    allergies?: SortOrder
    immunized?: SortOrder
    communicableDisease?: SortOrder
    asthmatic?: SortOrder
    chronicIllness?: SortOrder
    hiking?: SortOrder
    dancing?: SortOrder
    swimming?: SortOrder
    basketball?: SortOrder
    ballgames?: SortOrder
    jogging?: SortOrder
    football?: SortOrder
    badminton?: SortOrder
    calisthenics?: SortOrder
    wallclimbing?: SortOrder
    notFitActivities?: SortOrderInput | SortOrder
    medicationPermission?: SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentHealthFormCountOrderByAggregateInput
    _max?: StudentHealthFormMaxOrderByAggregateInput
    _min?: StudentHealthFormMinOrderByAggregateInput
  }

  export type StudentHealthFormScalarWhereWithAggregatesInput = {
    AND?: StudentHealthFormScalarWhereWithAggregatesInput | StudentHealthFormScalarWhereWithAggregatesInput[]
    OR?: StudentHealthFormScalarWhereWithAggregatesInput[]
    NOT?: StudentHealthFormScalarWhereWithAggregatesInput | StudentHealthFormScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    userId?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    lastName?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    firstName?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    middleInitial?: StringNullableWithAggregatesFilter<"StudentHealthForm"> | string | null
    birthdate?: DateTimeWithAggregatesFilter<"StudentHealthForm"> | Date | string
    gender?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    birthPlace?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    addressLine1?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    addressLine2?: StringNullableWithAggregatesFilter<"StudentHealthForm"> | string | null
    city?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    state?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    postalCode?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    guardianName?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    guardianContact?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    emergencyContact?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    relationship?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    emergencyNumber?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    pastIllnesses?: StringNullableWithAggregatesFilter<"StudentHealthForm"> | string | null
    hospitalization?: StringNullableWithAggregatesFilter<"StudentHealthForm"> | string | null
    bloodType?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    allergies?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    immunized?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    communicableDisease?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    asthmatic?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    chronicIllness?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    hiking?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    dancing?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    swimming?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    basketball?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    ballgames?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    jogging?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    football?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    badminton?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    calisthenics?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    wallclimbing?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    notFitActivities?: StringNullableWithAggregatesFilter<"StudentHealthForm"> | string | null
    medicationPermission?: BoolWithAggregatesFilter<"StudentHealthForm"> | boolean
    signaturePath?: StringWithAggregatesFilter<"StudentHealthForm"> | string
    dateSigned?: DateTimeWithAggregatesFilter<"StudentHealthForm"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"StudentHealthForm"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudentHealthForm"> | Date | string
  }

  export type UploadedFormWhereInput = {
    AND?: UploadedFormWhereInput | UploadedFormWhereInput[]
    OR?: UploadedFormWhereInput[]
    NOT?: UploadedFormWhereInput | UploadedFormWhereInput[]
    id?: StringFilter<"UploadedForm"> | string
    userId?: StringFilter<"UploadedForm"> | string
    formType?: StringFilter<"UploadedForm"> | string
    filePath?: StringFilter<"UploadedForm"> | string
    notes?: StringNullableFilter<"UploadedForm"> | string | null
    status?: StringFilter<"UploadedForm"> | string
    createdAt?: DateTimeFilter<"UploadedForm"> | Date | string
    updatedAt?: DateTimeFilter<"UploadedForm"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UploadedFormOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    formType?: SortOrder
    filePath?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UploadedFormWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadedFormWhereInput | UploadedFormWhereInput[]
    OR?: UploadedFormWhereInput[]
    NOT?: UploadedFormWhereInput | UploadedFormWhereInput[]
    userId?: StringFilter<"UploadedForm"> | string
    formType?: StringFilter<"UploadedForm"> | string
    filePath?: StringFilter<"UploadedForm"> | string
    notes?: StringNullableFilter<"UploadedForm"> | string | null
    status?: StringFilter<"UploadedForm"> | string
    createdAt?: DateTimeFilter<"UploadedForm"> | Date | string
    updatedAt?: DateTimeFilter<"UploadedForm"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UploadedFormOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    formType?: SortOrder
    filePath?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UploadedFormCountOrderByAggregateInput
    _max?: UploadedFormMaxOrderByAggregateInput
    _min?: UploadedFormMinOrderByAggregateInput
  }

  export type UploadedFormScalarWhereWithAggregatesInput = {
    AND?: UploadedFormScalarWhereWithAggregatesInput | UploadedFormScalarWhereWithAggregatesInput[]
    OR?: UploadedFormScalarWhereWithAggregatesInput[]
    NOT?: UploadedFormScalarWhereWithAggregatesInput | UploadedFormScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadedForm"> | string
    userId?: StringWithAggregatesFilter<"UploadedForm"> | string
    formType?: StringWithAggregatesFilter<"UploadedForm"> | string
    filePath?: StringWithAggregatesFilter<"UploadedForm"> | string
    notes?: StringNullableWithAggregatesFilter<"UploadedForm"> | string | null
    status?: StringWithAggregatesFilter<"UploadedForm"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UploadedForm"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UploadedForm"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: string
    status?: string
    emailVerified?: boolean
    verificationToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthForm?: StudentHealthFormCreateNestedOneWithoutUserInput
    uploadedForms?: UploadedFormCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: string
    status?: string
    emailVerified?: boolean
    verificationToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthForm?: StudentHealthFormUncheckedCreateNestedOneWithoutUserInput
    uploadedForms?: UploadedFormUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthForm?: StudentHealthFormUpdateOneWithoutUserNestedInput
    uploadedForms?: UploadedFormUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthForm?: StudentHealthFormUncheckedUpdateOneWithoutUserNestedInput
    uploadedForms?: UploadedFormUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: string
    status?: string
    emailVerified?: boolean
    verificationToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    id?: string
    token: string
    email: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    id?: string
    token: string
    email: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type VerificationTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    id?: string
    token: string
    email: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentHealthFormCreateInput = {
    id?: string
    lastName: string
    firstName: string
    middleInitial?: string | null
    birthdate: Date | string
    gender: string
    birthPlace: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    postalCode: string
    guardianName: string
    guardianContact: string
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    pastIllnesses?: string | null
    hospitalization?: string | null
    bloodType: string
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: string | null
    medicationPermission?: boolean
    signaturePath: string
    dateSigned?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutHealthFormInput
  }

  export type StudentHealthFormUncheckedCreateInput = {
    id?: string
    userId: string
    lastName: string
    firstName: string
    middleInitial?: string | null
    birthdate: Date | string
    gender: string
    birthPlace: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    postalCode: string
    guardianName: string
    guardianContact: string
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    pastIllnesses?: string | null
    hospitalization?: string | null
    bloodType: string
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: string | null
    medicationPermission?: boolean
    signaturePath: string
    dateSigned?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentHealthFormUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleInitial?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    birthPlace?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    guardianName?: StringFieldUpdateOperationsInput | string
    guardianContact?: StringFieldUpdateOperationsInput | string
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: StringFieldUpdateOperationsInput | string
    allergies?: BoolFieldUpdateOperationsInput | boolean
    immunized?: BoolFieldUpdateOperationsInput | boolean
    communicableDisease?: BoolFieldUpdateOperationsInput | boolean
    asthmatic?: BoolFieldUpdateOperationsInput | boolean
    chronicIllness?: BoolFieldUpdateOperationsInput | boolean
    hiking?: BoolFieldUpdateOperationsInput | boolean
    dancing?: BoolFieldUpdateOperationsInput | boolean
    swimming?: BoolFieldUpdateOperationsInput | boolean
    basketball?: BoolFieldUpdateOperationsInput | boolean
    ballgames?: BoolFieldUpdateOperationsInput | boolean
    jogging?: BoolFieldUpdateOperationsInput | boolean
    football?: BoolFieldUpdateOperationsInput | boolean
    badminton?: BoolFieldUpdateOperationsInput | boolean
    calisthenics?: BoolFieldUpdateOperationsInput | boolean
    wallclimbing?: BoolFieldUpdateOperationsInput | boolean
    notFitActivities?: NullableStringFieldUpdateOperationsInput | string | null
    medicationPermission?: BoolFieldUpdateOperationsInput | boolean
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHealthFormNestedInput
  }

  export type StudentHealthFormUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleInitial?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    birthPlace?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    guardianName?: StringFieldUpdateOperationsInput | string
    guardianContact?: StringFieldUpdateOperationsInput | string
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: StringFieldUpdateOperationsInput | string
    allergies?: BoolFieldUpdateOperationsInput | boolean
    immunized?: BoolFieldUpdateOperationsInput | boolean
    communicableDisease?: BoolFieldUpdateOperationsInput | boolean
    asthmatic?: BoolFieldUpdateOperationsInput | boolean
    chronicIllness?: BoolFieldUpdateOperationsInput | boolean
    hiking?: BoolFieldUpdateOperationsInput | boolean
    dancing?: BoolFieldUpdateOperationsInput | boolean
    swimming?: BoolFieldUpdateOperationsInput | boolean
    basketball?: BoolFieldUpdateOperationsInput | boolean
    ballgames?: BoolFieldUpdateOperationsInput | boolean
    jogging?: BoolFieldUpdateOperationsInput | boolean
    football?: BoolFieldUpdateOperationsInput | boolean
    badminton?: BoolFieldUpdateOperationsInput | boolean
    calisthenics?: BoolFieldUpdateOperationsInput | boolean
    wallclimbing?: BoolFieldUpdateOperationsInput | boolean
    notFitActivities?: NullableStringFieldUpdateOperationsInput | string | null
    medicationPermission?: BoolFieldUpdateOperationsInput | boolean
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentHealthFormCreateManyInput = {
    id?: string
    userId: string
    lastName: string
    firstName: string
    middleInitial?: string | null
    birthdate: Date | string
    gender: string
    birthPlace: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    postalCode: string
    guardianName: string
    guardianContact: string
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    pastIllnesses?: string | null
    hospitalization?: string | null
    bloodType: string
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: string | null
    medicationPermission?: boolean
    signaturePath: string
    dateSigned?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentHealthFormUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleInitial?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    birthPlace?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    guardianName?: StringFieldUpdateOperationsInput | string
    guardianContact?: StringFieldUpdateOperationsInput | string
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: StringFieldUpdateOperationsInput | string
    allergies?: BoolFieldUpdateOperationsInput | boolean
    immunized?: BoolFieldUpdateOperationsInput | boolean
    communicableDisease?: BoolFieldUpdateOperationsInput | boolean
    asthmatic?: BoolFieldUpdateOperationsInput | boolean
    chronicIllness?: BoolFieldUpdateOperationsInput | boolean
    hiking?: BoolFieldUpdateOperationsInput | boolean
    dancing?: BoolFieldUpdateOperationsInput | boolean
    swimming?: BoolFieldUpdateOperationsInput | boolean
    basketball?: BoolFieldUpdateOperationsInput | boolean
    ballgames?: BoolFieldUpdateOperationsInput | boolean
    jogging?: BoolFieldUpdateOperationsInput | boolean
    football?: BoolFieldUpdateOperationsInput | boolean
    badminton?: BoolFieldUpdateOperationsInput | boolean
    calisthenics?: BoolFieldUpdateOperationsInput | boolean
    wallclimbing?: BoolFieldUpdateOperationsInput | boolean
    notFitActivities?: NullableStringFieldUpdateOperationsInput | string | null
    medicationPermission?: BoolFieldUpdateOperationsInput | boolean
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentHealthFormUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleInitial?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    birthPlace?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    guardianName?: StringFieldUpdateOperationsInput | string
    guardianContact?: StringFieldUpdateOperationsInput | string
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: StringFieldUpdateOperationsInput | string
    allergies?: BoolFieldUpdateOperationsInput | boolean
    immunized?: BoolFieldUpdateOperationsInput | boolean
    communicableDisease?: BoolFieldUpdateOperationsInput | boolean
    asthmatic?: BoolFieldUpdateOperationsInput | boolean
    chronicIllness?: BoolFieldUpdateOperationsInput | boolean
    hiking?: BoolFieldUpdateOperationsInput | boolean
    dancing?: BoolFieldUpdateOperationsInput | boolean
    swimming?: BoolFieldUpdateOperationsInput | boolean
    basketball?: BoolFieldUpdateOperationsInput | boolean
    ballgames?: BoolFieldUpdateOperationsInput | boolean
    jogging?: BoolFieldUpdateOperationsInput | boolean
    football?: BoolFieldUpdateOperationsInput | boolean
    badminton?: BoolFieldUpdateOperationsInput | boolean
    calisthenics?: BoolFieldUpdateOperationsInput | boolean
    wallclimbing?: BoolFieldUpdateOperationsInput | boolean
    notFitActivities?: NullableStringFieldUpdateOperationsInput | string | null
    medicationPermission?: BoolFieldUpdateOperationsInput | boolean
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFormCreateInput = {
    id?: string
    formType: string
    filePath: string
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUploadedFormsInput
  }

  export type UploadedFormUncheckedCreateInput = {
    id?: string
    userId: string
    formType: string
    filePath: string
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadedFormUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUploadedFormsNestedInput
  }

  export type UploadedFormUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    formType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFormCreateManyInput = {
    id?: string
    userId: string
    formType: string
    filePath: string
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadedFormUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFormUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    formType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StudentHealthFormNullableScalarRelationFilter = {
    is?: StudentHealthFormWhereInput | null
    isNot?: StudentHealthFormWhereInput | null
  }

  export type UploadedFormListRelationFilter = {
    every?: UploadedFormWhereInput
    some?: UploadedFormWhereInput
    none?: UploadedFormWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UploadedFormOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    email?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    email?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    email?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StudentHealthFormCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    middleInitial?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    birthPlace?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    guardianName?: SortOrder
    guardianContact?: SortOrder
    emergencyContact?: SortOrder
    relationship?: SortOrder
    emergencyNumber?: SortOrder
    pastIllnesses?: SortOrder
    hospitalization?: SortOrder
    bloodType?: SortOrder
    allergies?: SortOrder
    immunized?: SortOrder
    communicableDisease?: SortOrder
    asthmatic?: SortOrder
    chronicIllness?: SortOrder
    hiking?: SortOrder
    dancing?: SortOrder
    swimming?: SortOrder
    basketball?: SortOrder
    ballgames?: SortOrder
    jogging?: SortOrder
    football?: SortOrder
    badminton?: SortOrder
    calisthenics?: SortOrder
    wallclimbing?: SortOrder
    notFitActivities?: SortOrder
    medicationPermission?: SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentHealthFormMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    middleInitial?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    birthPlace?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    guardianName?: SortOrder
    guardianContact?: SortOrder
    emergencyContact?: SortOrder
    relationship?: SortOrder
    emergencyNumber?: SortOrder
    pastIllnesses?: SortOrder
    hospitalization?: SortOrder
    bloodType?: SortOrder
    allergies?: SortOrder
    immunized?: SortOrder
    communicableDisease?: SortOrder
    asthmatic?: SortOrder
    chronicIllness?: SortOrder
    hiking?: SortOrder
    dancing?: SortOrder
    swimming?: SortOrder
    basketball?: SortOrder
    ballgames?: SortOrder
    jogging?: SortOrder
    football?: SortOrder
    badminton?: SortOrder
    calisthenics?: SortOrder
    wallclimbing?: SortOrder
    notFitActivities?: SortOrder
    medicationPermission?: SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentHealthFormMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    middleInitial?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    birthPlace?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    guardianName?: SortOrder
    guardianContact?: SortOrder
    emergencyContact?: SortOrder
    relationship?: SortOrder
    emergencyNumber?: SortOrder
    pastIllnesses?: SortOrder
    hospitalization?: SortOrder
    bloodType?: SortOrder
    allergies?: SortOrder
    immunized?: SortOrder
    communicableDisease?: SortOrder
    asthmatic?: SortOrder
    chronicIllness?: SortOrder
    hiking?: SortOrder
    dancing?: SortOrder
    swimming?: SortOrder
    basketball?: SortOrder
    ballgames?: SortOrder
    jogging?: SortOrder
    football?: SortOrder
    badminton?: SortOrder
    calisthenics?: SortOrder
    wallclimbing?: SortOrder
    notFitActivities?: SortOrder
    medicationPermission?: SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UploadedFormCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formType?: SortOrder
    filePath?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UploadedFormMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formType?: SortOrder
    filePath?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UploadedFormMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formType?: SortOrder
    filePath?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentHealthFormCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentHealthFormCreateWithoutUserInput, StudentHealthFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentHealthFormCreateOrConnectWithoutUserInput
    connect?: StudentHealthFormWhereUniqueInput
  }

  export type UploadedFormCreateNestedManyWithoutUserInput = {
    create?: XOR<UploadedFormCreateWithoutUserInput, UploadedFormUncheckedCreateWithoutUserInput> | UploadedFormCreateWithoutUserInput[] | UploadedFormUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadedFormCreateOrConnectWithoutUserInput | UploadedFormCreateOrConnectWithoutUserInput[]
    createMany?: UploadedFormCreateManyUserInputEnvelope
    connect?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
  }

  export type StudentHealthFormUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentHealthFormCreateWithoutUserInput, StudentHealthFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentHealthFormCreateOrConnectWithoutUserInput
    connect?: StudentHealthFormWhereUniqueInput
  }

  export type UploadedFormUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UploadedFormCreateWithoutUserInput, UploadedFormUncheckedCreateWithoutUserInput> | UploadedFormCreateWithoutUserInput[] | UploadedFormUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadedFormCreateOrConnectWithoutUserInput | UploadedFormCreateOrConnectWithoutUserInput[]
    createMany?: UploadedFormCreateManyUserInputEnvelope
    connect?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentHealthFormUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentHealthFormCreateWithoutUserInput, StudentHealthFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentHealthFormCreateOrConnectWithoutUserInput
    upsert?: StudentHealthFormUpsertWithoutUserInput
    disconnect?: StudentHealthFormWhereInput | boolean
    delete?: StudentHealthFormWhereInput | boolean
    connect?: StudentHealthFormWhereUniqueInput
    update?: XOR<XOR<StudentHealthFormUpdateToOneWithWhereWithoutUserInput, StudentHealthFormUpdateWithoutUserInput>, StudentHealthFormUncheckedUpdateWithoutUserInput>
  }

  export type UploadedFormUpdateManyWithoutUserNestedInput = {
    create?: XOR<UploadedFormCreateWithoutUserInput, UploadedFormUncheckedCreateWithoutUserInput> | UploadedFormCreateWithoutUserInput[] | UploadedFormUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadedFormCreateOrConnectWithoutUserInput | UploadedFormCreateOrConnectWithoutUserInput[]
    upsert?: UploadedFormUpsertWithWhereUniqueWithoutUserInput | UploadedFormUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UploadedFormCreateManyUserInputEnvelope
    set?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
    disconnect?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
    delete?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
    connect?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
    update?: UploadedFormUpdateWithWhereUniqueWithoutUserInput | UploadedFormUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UploadedFormUpdateManyWithWhereWithoutUserInput | UploadedFormUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UploadedFormScalarWhereInput | UploadedFormScalarWhereInput[]
  }

  export type StudentHealthFormUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentHealthFormCreateWithoutUserInput, StudentHealthFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentHealthFormCreateOrConnectWithoutUserInput
    upsert?: StudentHealthFormUpsertWithoutUserInput
    disconnect?: StudentHealthFormWhereInput | boolean
    delete?: StudentHealthFormWhereInput | boolean
    connect?: StudentHealthFormWhereUniqueInput
    update?: XOR<XOR<StudentHealthFormUpdateToOneWithWhereWithoutUserInput, StudentHealthFormUpdateWithoutUserInput>, StudentHealthFormUncheckedUpdateWithoutUserInput>
  }

  export type UploadedFormUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UploadedFormCreateWithoutUserInput, UploadedFormUncheckedCreateWithoutUserInput> | UploadedFormCreateWithoutUserInput[] | UploadedFormUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadedFormCreateOrConnectWithoutUserInput | UploadedFormCreateOrConnectWithoutUserInput[]
    upsert?: UploadedFormUpsertWithWhereUniqueWithoutUserInput | UploadedFormUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UploadedFormCreateManyUserInputEnvelope
    set?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
    disconnect?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
    delete?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
    connect?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
    update?: UploadedFormUpdateWithWhereUniqueWithoutUserInput | UploadedFormUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UploadedFormUpdateManyWithWhereWithoutUserInput | UploadedFormUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UploadedFormScalarWhereInput | UploadedFormScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutHealthFormInput = {
    create?: XOR<UserCreateWithoutHealthFormInput, UserUncheckedCreateWithoutHealthFormInput>
    connectOrCreate?: UserCreateOrConnectWithoutHealthFormInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutHealthFormNestedInput = {
    create?: XOR<UserCreateWithoutHealthFormInput, UserUncheckedCreateWithoutHealthFormInput>
    connectOrCreate?: UserCreateOrConnectWithoutHealthFormInput
    upsert?: UserUpsertWithoutHealthFormInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHealthFormInput, UserUpdateWithoutHealthFormInput>, UserUncheckedUpdateWithoutHealthFormInput>
  }

  export type UserCreateNestedOneWithoutUploadedFormsInput = {
    create?: XOR<UserCreateWithoutUploadedFormsInput, UserUncheckedCreateWithoutUploadedFormsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedFormsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUploadedFormsNestedInput = {
    create?: XOR<UserCreateWithoutUploadedFormsInput, UserUncheckedCreateWithoutUploadedFormsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedFormsInput
    upsert?: UserUpsertWithoutUploadedFormsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadedFormsInput, UserUpdateWithoutUploadedFormsInput>, UserUncheckedUpdateWithoutUploadedFormsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StudentHealthFormCreateWithoutUserInput = {
    id?: string
    lastName: string
    firstName: string
    middleInitial?: string | null
    birthdate: Date | string
    gender: string
    birthPlace: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    postalCode: string
    guardianName: string
    guardianContact: string
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    pastIllnesses?: string | null
    hospitalization?: string | null
    bloodType: string
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: string | null
    medicationPermission?: boolean
    signaturePath: string
    dateSigned?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentHealthFormUncheckedCreateWithoutUserInput = {
    id?: string
    lastName: string
    firstName: string
    middleInitial?: string | null
    birthdate: Date | string
    gender: string
    birthPlace: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    postalCode: string
    guardianName: string
    guardianContact: string
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    pastIllnesses?: string | null
    hospitalization?: string | null
    bloodType: string
    allergies?: boolean
    immunized?: boolean
    communicableDisease?: boolean
    asthmatic?: boolean
    chronicIllness?: boolean
    hiking?: boolean
    dancing?: boolean
    swimming?: boolean
    basketball?: boolean
    ballgames?: boolean
    jogging?: boolean
    football?: boolean
    badminton?: boolean
    calisthenics?: boolean
    wallclimbing?: boolean
    notFitActivities?: string | null
    medicationPermission?: boolean
    signaturePath: string
    dateSigned?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentHealthFormCreateOrConnectWithoutUserInput = {
    where: StudentHealthFormWhereUniqueInput
    create: XOR<StudentHealthFormCreateWithoutUserInput, StudentHealthFormUncheckedCreateWithoutUserInput>
  }

  export type UploadedFormCreateWithoutUserInput = {
    id?: string
    formType: string
    filePath: string
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadedFormUncheckedCreateWithoutUserInput = {
    id?: string
    formType: string
    filePath: string
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadedFormCreateOrConnectWithoutUserInput = {
    where: UploadedFormWhereUniqueInput
    create: XOR<UploadedFormCreateWithoutUserInput, UploadedFormUncheckedCreateWithoutUserInput>
  }

  export type UploadedFormCreateManyUserInputEnvelope = {
    data: UploadedFormCreateManyUserInput | UploadedFormCreateManyUserInput[]
  }

  export type StudentHealthFormUpsertWithoutUserInput = {
    update: XOR<StudentHealthFormUpdateWithoutUserInput, StudentHealthFormUncheckedUpdateWithoutUserInput>
    create: XOR<StudentHealthFormCreateWithoutUserInput, StudentHealthFormUncheckedCreateWithoutUserInput>
    where?: StudentHealthFormWhereInput
  }

  export type StudentHealthFormUpdateToOneWithWhereWithoutUserInput = {
    where?: StudentHealthFormWhereInput
    data: XOR<StudentHealthFormUpdateWithoutUserInput, StudentHealthFormUncheckedUpdateWithoutUserInput>
  }

  export type StudentHealthFormUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleInitial?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    birthPlace?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    guardianName?: StringFieldUpdateOperationsInput | string
    guardianContact?: StringFieldUpdateOperationsInput | string
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: StringFieldUpdateOperationsInput | string
    allergies?: BoolFieldUpdateOperationsInput | boolean
    immunized?: BoolFieldUpdateOperationsInput | boolean
    communicableDisease?: BoolFieldUpdateOperationsInput | boolean
    asthmatic?: BoolFieldUpdateOperationsInput | boolean
    chronicIllness?: BoolFieldUpdateOperationsInput | boolean
    hiking?: BoolFieldUpdateOperationsInput | boolean
    dancing?: BoolFieldUpdateOperationsInput | boolean
    swimming?: BoolFieldUpdateOperationsInput | boolean
    basketball?: BoolFieldUpdateOperationsInput | boolean
    ballgames?: BoolFieldUpdateOperationsInput | boolean
    jogging?: BoolFieldUpdateOperationsInput | boolean
    football?: BoolFieldUpdateOperationsInput | boolean
    badminton?: BoolFieldUpdateOperationsInput | boolean
    calisthenics?: BoolFieldUpdateOperationsInput | boolean
    wallclimbing?: BoolFieldUpdateOperationsInput | boolean
    notFitActivities?: NullableStringFieldUpdateOperationsInput | string | null
    medicationPermission?: BoolFieldUpdateOperationsInput | boolean
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentHealthFormUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleInitial?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    birthPlace?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    guardianName?: StringFieldUpdateOperationsInput | string
    guardianContact?: StringFieldUpdateOperationsInput | string
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: StringFieldUpdateOperationsInput | string
    allergies?: BoolFieldUpdateOperationsInput | boolean
    immunized?: BoolFieldUpdateOperationsInput | boolean
    communicableDisease?: BoolFieldUpdateOperationsInput | boolean
    asthmatic?: BoolFieldUpdateOperationsInput | boolean
    chronicIllness?: BoolFieldUpdateOperationsInput | boolean
    hiking?: BoolFieldUpdateOperationsInput | boolean
    dancing?: BoolFieldUpdateOperationsInput | boolean
    swimming?: BoolFieldUpdateOperationsInput | boolean
    basketball?: BoolFieldUpdateOperationsInput | boolean
    ballgames?: BoolFieldUpdateOperationsInput | boolean
    jogging?: BoolFieldUpdateOperationsInput | boolean
    football?: BoolFieldUpdateOperationsInput | boolean
    badminton?: BoolFieldUpdateOperationsInput | boolean
    calisthenics?: BoolFieldUpdateOperationsInput | boolean
    wallclimbing?: BoolFieldUpdateOperationsInput | boolean
    notFitActivities?: NullableStringFieldUpdateOperationsInput | string | null
    medicationPermission?: BoolFieldUpdateOperationsInput | boolean
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFormUpsertWithWhereUniqueWithoutUserInput = {
    where: UploadedFormWhereUniqueInput
    update: XOR<UploadedFormUpdateWithoutUserInput, UploadedFormUncheckedUpdateWithoutUserInput>
    create: XOR<UploadedFormCreateWithoutUserInput, UploadedFormUncheckedCreateWithoutUserInput>
  }

  export type UploadedFormUpdateWithWhereUniqueWithoutUserInput = {
    where: UploadedFormWhereUniqueInput
    data: XOR<UploadedFormUpdateWithoutUserInput, UploadedFormUncheckedUpdateWithoutUserInput>
  }

  export type UploadedFormUpdateManyWithWhereWithoutUserInput = {
    where: UploadedFormScalarWhereInput
    data: XOR<UploadedFormUpdateManyMutationInput, UploadedFormUncheckedUpdateManyWithoutUserInput>
  }

  export type UploadedFormScalarWhereInput = {
    AND?: UploadedFormScalarWhereInput | UploadedFormScalarWhereInput[]
    OR?: UploadedFormScalarWhereInput[]
    NOT?: UploadedFormScalarWhereInput | UploadedFormScalarWhereInput[]
    id?: StringFilter<"UploadedForm"> | string
    userId?: StringFilter<"UploadedForm"> | string
    formType?: StringFilter<"UploadedForm"> | string
    filePath?: StringFilter<"UploadedForm"> | string
    notes?: StringNullableFilter<"UploadedForm"> | string | null
    status?: StringFilter<"UploadedForm"> | string
    createdAt?: DateTimeFilter<"UploadedForm"> | Date | string
    updatedAt?: DateTimeFilter<"UploadedForm"> | Date | string
  }

  export type UserCreateWithoutHealthFormInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: string
    status?: string
    emailVerified?: boolean
    verificationToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedForms?: UploadedFormCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHealthFormInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: string
    status?: string
    emailVerified?: boolean
    verificationToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedForms?: UploadedFormUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHealthFormInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHealthFormInput, UserUncheckedCreateWithoutHealthFormInput>
  }

  export type UserUpsertWithoutHealthFormInput = {
    update: XOR<UserUpdateWithoutHealthFormInput, UserUncheckedUpdateWithoutHealthFormInput>
    create: XOR<UserCreateWithoutHealthFormInput, UserUncheckedCreateWithoutHealthFormInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHealthFormInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHealthFormInput, UserUncheckedUpdateWithoutHealthFormInput>
  }

  export type UserUpdateWithoutHealthFormInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedForms?: UploadedFormUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHealthFormInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedForms?: UploadedFormUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutUploadedFormsInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: string
    status?: string
    emailVerified?: boolean
    verificationToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthForm?: StudentHealthFormCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUploadedFormsInput = {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: string
    status?: string
    emailVerified?: boolean
    verificationToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthForm?: StudentHealthFormUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUploadedFormsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedFormsInput, UserUncheckedCreateWithoutUploadedFormsInput>
  }

  export type UserUpsertWithoutUploadedFormsInput = {
    update: XOR<UserUpdateWithoutUploadedFormsInput, UserUncheckedUpdateWithoutUploadedFormsInput>
    create: XOR<UserCreateWithoutUploadedFormsInput, UserUncheckedCreateWithoutUploadedFormsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadedFormsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadedFormsInput, UserUncheckedUpdateWithoutUploadedFormsInput>
  }

  export type UserUpdateWithoutUploadedFormsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthForm?: StudentHealthFormUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedFormsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthForm?: StudentHealthFormUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UploadedFormCreateManyUserInput = {
    id?: string
    formType: string
    filePath: string
    notes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadedFormUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFormUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFormUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formType?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}