
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
 * Model UserHealthForm
 * 
 */
export type UserHealthForm = $Result.DefaultSelection<Prisma.$UserHealthFormPayload>
/**
 * Model UploadedForm
 * 
 */
export type UploadedForm = $Result.DefaultSelection<Prisma.$UploadedFormPayload>
/**
 * Model ConsultationDate
 * 
 */
export type ConsultationDate = $Result.DefaultSelection<Prisma.$ConsultationDatePayload>
/**
 * Model TimeSlot
 * 
 */
export type TimeSlot = $Result.DefaultSelection<Prisma.$TimeSlotPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model ClearanceRequest
 * 
 */
export type ClearanceRequest = $Result.DefaultSelection<Prisma.$ClearanceRequestPayload>

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
   * `prisma.userHealthForm`: Exposes CRUD operations for the **UserHealthForm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserHealthForms
    * const userHealthForms = await prisma.userHealthForm.findMany()
    * ```
    */
  get userHealthForm(): Prisma.UserHealthFormDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadedForm`: Exposes CRUD operations for the **UploadedForm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadedForms
    * const uploadedForms = await prisma.uploadedForm.findMany()
    * ```
    */
  get uploadedForm(): Prisma.UploadedFormDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consultationDate`: Exposes CRUD operations for the **ConsultationDate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConsultationDates
    * const consultationDates = await prisma.consultationDate.findMany()
    * ```
    */
  get consultationDate(): Prisma.ConsultationDateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeSlot`: Exposes CRUD operations for the **TimeSlot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TimeSlots
    * const timeSlots = await prisma.timeSlot.findMany()
    * ```
    */
  get timeSlot(): Prisma.TimeSlotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clearanceRequest`: Exposes CRUD operations for the **ClearanceRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClearanceRequests
    * const clearanceRequests = await prisma.clearanceRequest.findMany()
    * ```
    */
  get clearanceRequest(): Prisma.ClearanceRequestDelegate<ExtArgs, ClientOptions>;
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
    UserHealthForm: 'UserHealthForm',
    UploadedForm: 'UploadedForm',
    ConsultationDate: 'ConsultationDate',
    TimeSlot: 'TimeSlot',
    Appointment: 'Appointment',
    Department: 'Department',
    ClearanceRequest: 'ClearanceRequest'
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
      modelProps: "user" | "verificationToken" | "userHealthForm" | "uploadedForm" | "consultationDate" | "timeSlot" | "appointment" | "department" | "clearanceRequest"
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
      UserHealthForm: {
        payload: Prisma.$UserHealthFormPayload<ExtArgs>
        fields: Prisma.UserHealthFormFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserHealthFormFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserHealthFormFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>
          }
          findFirst: {
            args: Prisma.UserHealthFormFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserHealthFormFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>
          }
          findMany: {
            args: Prisma.UserHealthFormFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>[]
          }
          create: {
            args: Prisma.UserHealthFormCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>
          }
          createMany: {
            args: Prisma.UserHealthFormCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserHealthFormCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>[]
          }
          delete: {
            args: Prisma.UserHealthFormDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>
          }
          update: {
            args: Prisma.UserHealthFormUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>
          }
          deleteMany: {
            args: Prisma.UserHealthFormDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserHealthFormUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserHealthFormUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>[]
          }
          upsert: {
            args: Prisma.UserHealthFormUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHealthFormPayload>
          }
          aggregate: {
            args: Prisma.UserHealthFormAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserHealthForm>
          }
          groupBy: {
            args: Prisma.UserHealthFormGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserHealthFormGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserHealthFormCountArgs<ExtArgs>
            result: $Utils.Optional<UserHealthFormCountAggregateOutputType> | number
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
      ConsultationDate: {
        payload: Prisma.$ConsultationDatePayload<ExtArgs>
        fields: Prisma.ConsultationDateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsultationDateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsultationDateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>
          }
          findFirst: {
            args: Prisma.ConsultationDateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsultationDateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>
          }
          findMany: {
            args: Prisma.ConsultationDateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>[]
          }
          create: {
            args: Prisma.ConsultationDateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>
          }
          createMany: {
            args: Prisma.ConsultationDateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsultationDateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>[]
          }
          delete: {
            args: Prisma.ConsultationDateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>
          }
          update: {
            args: Prisma.ConsultationDateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>
          }
          deleteMany: {
            args: Prisma.ConsultationDateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsultationDateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsultationDateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>[]
          }
          upsert: {
            args: Prisma.ConsultationDateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsultationDatePayload>
          }
          aggregate: {
            args: Prisma.ConsultationDateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsultationDate>
          }
          groupBy: {
            args: Prisma.ConsultationDateGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultationDateGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsultationDateCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultationDateCountAggregateOutputType> | number
          }
        }
      }
      TimeSlot: {
        payload: Prisma.$TimeSlotPayload<ExtArgs>
        fields: Prisma.TimeSlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeSlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeSlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          findFirst: {
            args: Prisma.TimeSlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeSlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          findMany: {
            args: Prisma.TimeSlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>[]
          }
          create: {
            args: Prisma.TimeSlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          createMany: {
            args: Prisma.TimeSlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeSlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>[]
          }
          delete: {
            args: Prisma.TimeSlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          update: {
            args: Prisma.TimeSlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          deleteMany: {
            args: Prisma.TimeSlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeSlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimeSlotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>[]
          }
          upsert: {
            args: Prisma.TimeSlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeSlotPayload>
          }
          aggregate: {
            args: Prisma.TimeSlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeSlot>
          }
          groupBy: {
            args: Prisma.TimeSlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeSlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeSlotCountArgs<ExtArgs>
            result: $Utils.Optional<TimeSlotCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      ClearanceRequest: {
        payload: Prisma.$ClearanceRequestPayload<ExtArgs>
        fields: Prisma.ClearanceRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClearanceRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClearanceRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>
          }
          findFirst: {
            args: Prisma.ClearanceRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClearanceRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>
          }
          findMany: {
            args: Prisma.ClearanceRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>[]
          }
          create: {
            args: Prisma.ClearanceRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>
          }
          createMany: {
            args: Prisma.ClearanceRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClearanceRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>[]
          }
          delete: {
            args: Prisma.ClearanceRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>
          }
          update: {
            args: Prisma.ClearanceRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>
          }
          deleteMany: {
            args: Prisma.ClearanceRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClearanceRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClearanceRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>[]
          }
          upsert: {
            args: Prisma.ClearanceRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClearanceRequestPayload>
          }
          aggregate: {
            args: Prisma.ClearanceRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClearanceRequest>
          }
          groupBy: {
            args: Prisma.ClearanceRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClearanceRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClearanceRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ClearanceRequestCountAggregateOutputType> | number
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
    userHealthForm?: UserHealthFormOmit
    uploadedForm?: UploadedFormOmit
    consultationDate?: ConsultationDateOmit
    timeSlot?: TimeSlotOmit
    appointment?: AppointmentOmit
    department?: DepartmentOmit
    clearanceRequest?: ClearanceRequestOmit
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
    appointments: number
    clearanceRequests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedForms?: boolean | UserCountOutputTypeCountUploadedFormsArgs
    appointments?: boolean | UserCountOutputTypeCountAppointmentsArgs
    clearanceRequests?: boolean | UserCountOutputTypeCountClearanceRequestsArgs
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
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClearanceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClearanceRequestWhereInput
  }


  /**
   * Count Type ConsultationDateCountOutputType
   */

  export type ConsultationDateCountOutputType = {
    timeSlots: number
  }

  export type ConsultationDateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeSlots?: boolean | ConsultationDateCountOutputTypeCountTimeSlotsArgs
  }

  // Custom InputTypes
  /**
   * ConsultationDateCountOutputType without action
   */
  export type ConsultationDateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDateCountOutputType
     */
    select?: ConsultationDateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConsultationDateCountOutputType without action
   */
  export type ConsultationDateCountOutputTypeCountTimeSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeSlotWhereInput
  }


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    clearanceRequests: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clearanceRequests?: boolean | DepartmentCountOutputTypeCountClearanceRequestsArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountClearanceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClearanceRequestWhereInput
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
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    clearanceRequests?: boolean | User$clearanceRequestsArgs<ExtArgs>
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
    appointments?: boolean | User$appointmentsArgs<ExtArgs>
    clearanceRequests?: boolean | User$clearanceRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      healthForm: Prisma.$UserHealthFormPayload<ExtArgs> | null
      uploadedForms: Prisma.$UploadedFormPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      clearanceRequests: Prisma.$ClearanceRequestPayload<ExtArgs>[]
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
    healthForm<T extends User$healthFormArgs<ExtArgs> = {}>(args?: Subset<T, User$healthFormArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    uploadedForms<T extends User$uploadedFormsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedFormsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFormPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends User$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clearanceRequests<T extends User$clearanceRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$clearanceRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    where?: UserHealthFormWhereInput
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
   * User.appointments
   */
  export type User$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.clearanceRequests
   */
  export type User$clearanceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    where?: ClearanceRequestWhereInput
    orderBy?: ClearanceRequestOrderByWithRelationInput | ClearanceRequestOrderByWithRelationInput[]
    cursor?: ClearanceRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClearanceRequestScalarFieldEnum | ClearanceRequestScalarFieldEnum[]
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
   * Model UserHealthForm
   */

  export type AggregateUserHealthForm = {
    _count: UserHealthFormCountAggregateOutputType | null
    _min: UserHealthFormMinAggregateOutputType | null
    _max: UserHealthFormMaxAggregateOutputType | null
  }

  export type UserHealthFormMinAggregateOutputType = {
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
    bloodType: string | null
    signaturePath: string | null
    dateSigned: Date | null
    pastIllnesses: string | null
    hospitalization: string | null
    medications: string | null
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
  }

  export type UserHealthFormMaxAggregateOutputType = {
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
    bloodType: string | null
    signaturePath: string | null
    dateSigned: Date | null
    pastIllnesses: string | null
    hospitalization: string | null
    medications: string | null
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
  }

  export type UserHealthFormCountAggregateOutputType = {
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
    bloodType: number
    signaturePath: number
    dateSigned: number
    pastIllnesses: number
    hospitalization: number
    medications: number
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
    _all: number
  }


  export type UserHealthFormMinAggregateInputType = {
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
    bloodType?: true
    signaturePath?: true
    dateSigned?: true
    pastIllnesses?: true
    hospitalization?: true
    medications?: true
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
  }

  export type UserHealthFormMaxAggregateInputType = {
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
    bloodType?: true
    signaturePath?: true
    dateSigned?: true
    pastIllnesses?: true
    hospitalization?: true
    medications?: true
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
  }

  export type UserHealthFormCountAggregateInputType = {
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
    bloodType?: true
    signaturePath?: true
    dateSigned?: true
    pastIllnesses?: true
    hospitalization?: true
    medications?: true
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
    _all?: true
  }

  export type UserHealthFormAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserHealthForm to aggregate.
     */
    where?: UserHealthFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserHealthForms to fetch.
     */
    orderBy?: UserHealthFormOrderByWithRelationInput | UserHealthFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserHealthFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserHealthForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserHealthForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserHealthForms
    **/
    _count?: true | UserHealthFormCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserHealthFormMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserHealthFormMaxAggregateInputType
  }

  export type GetUserHealthFormAggregateType<T extends UserHealthFormAggregateArgs> = {
        [P in keyof T & keyof AggregateUserHealthForm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserHealthForm[P]>
      : GetScalarType<T[P], AggregateUserHealthForm[P]>
  }




  export type UserHealthFormGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserHealthFormWhereInput
    orderBy?: UserHealthFormOrderByWithAggregationInput | UserHealthFormOrderByWithAggregationInput[]
    by: UserHealthFormScalarFieldEnum[] | UserHealthFormScalarFieldEnum
    having?: UserHealthFormScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserHealthFormCountAggregateInputType | true
    _min?: UserHealthFormMinAggregateInputType
    _max?: UserHealthFormMaxAggregateInputType
  }

  export type UserHealthFormGroupByOutputType = {
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
    guardianName: string | null
    guardianContact: string | null
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    bloodType: string | null
    signaturePath: string
    dateSigned: Date
    pastIllnesses: string | null
    hospitalization: string | null
    medications: string | null
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
    _count: UserHealthFormCountAggregateOutputType | null
    _min: UserHealthFormMinAggregateOutputType | null
    _max: UserHealthFormMaxAggregateOutputType | null
  }

  type GetUserHealthFormGroupByPayload<T extends UserHealthFormGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserHealthFormGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserHealthFormGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserHealthFormGroupByOutputType[P]>
            : GetScalarType<T[P], UserHealthFormGroupByOutputType[P]>
        }
      >
    >


  export type UserHealthFormSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    bloodType?: boolean
    signaturePath?: boolean
    dateSigned?: boolean
    pastIllnesses?: boolean
    hospitalization?: boolean
    medications?: boolean
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
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userHealthForm"]>

  export type UserHealthFormSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    bloodType?: boolean
    signaturePath?: boolean
    dateSigned?: boolean
    pastIllnesses?: boolean
    hospitalization?: boolean
    medications?: boolean
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
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userHealthForm"]>

  export type UserHealthFormSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    bloodType?: boolean
    signaturePath?: boolean
    dateSigned?: boolean
    pastIllnesses?: boolean
    hospitalization?: boolean
    medications?: boolean
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
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userHealthForm"]>

  export type UserHealthFormSelectScalar = {
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
    bloodType?: boolean
    signaturePath?: boolean
    dateSigned?: boolean
    pastIllnesses?: boolean
    hospitalization?: boolean
    medications?: boolean
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
  }

  export type UserHealthFormOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "lastName" | "firstName" | "middleInitial" | "birthdate" | "gender" | "birthPlace" | "addressLine1" | "addressLine2" | "city" | "state" | "postalCode" | "guardianName" | "guardianContact" | "emergencyContact" | "relationship" | "emergencyNumber" | "bloodType" | "signaturePath" | "dateSigned" | "pastIllnesses" | "hospitalization" | "medications" | "allergies" | "immunized" | "communicableDisease" | "asthmatic" | "chronicIllness" | "hiking" | "dancing" | "swimming" | "basketball" | "ballgames" | "jogging" | "football" | "badminton" | "calisthenics" | "wallclimbing" | "notFitActivities" | "medicationPermission", ExtArgs["result"]["userHealthForm"]>
  export type UserHealthFormInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserHealthFormIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserHealthFormIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserHealthFormPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserHealthForm"
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
      guardianName: string | null
      guardianContact: string | null
      emergencyContact: string
      relationship: string
      emergencyNumber: string
      bloodType: string | null
      signaturePath: string
      dateSigned: Date
      pastIllnesses: string | null
      hospitalization: string | null
      medications: string | null
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
    }, ExtArgs["result"]["userHealthForm"]>
    composites: {}
  }

  type UserHealthFormGetPayload<S extends boolean | null | undefined | UserHealthFormDefaultArgs> = $Result.GetResult<Prisma.$UserHealthFormPayload, S>

  type UserHealthFormCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserHealthFormFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserHealthFormCountAggregateInputType | true
    }

  export interface UserHealthFormDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserHealthForm'], meta: { name: 'UserHealthForm' } }
    /**
     * Find zero or one UserHealthForm that matches the filter.
     * @param {UserHealthFormFindUniqueArgs} args - Arguments to find a UserHealthForm
     * @example
     * // Get one UserHealthForm
     * const userHealthForm = await prisma.userHealthForm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserHealthFormFindUniqueArgs>(args: SelectSubset<T, UserHealthFormFindUniqueArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserHealthForm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserHealthFormFindUniqueOrThrowArgs} args - Arguments to find a UserHealthForm
     * @example
     * // Get one UserHealthForm
     * const userHealthForm = await prisma.userHealthForm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserHealthFormFindUniqueOrThrowArgs>(args: SelectSubset<T, UserHealthFormFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserHealthForm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHealthFormFindFirstArgs} args - Arguments to find a UserHealthForm
     * @example
     * // Get one UserHealthForm
     * const userHealthForm = await prisma.userHealthForm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserHealthFormFindFirstArgs>(args?: SelectSubset<T, UserHealthFormFindFirstArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserHealthForm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHealthFormFindFirstOrThrowArgs} args - Arguments to find a UserHealthForm
     * @example
     * // Get one UserHealthForm
     * const userHealthForm = await prisma.userHealthForm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserHealthFormFindFirstOrThrowArgs>(args?: SelectSubset<T, UserHealthFormFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserHealthForms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHealthFormFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserHealthForms
     * const userHealthForms = await prisma.userHealthForm.findMany()
     * 
     * // Get first 10 UserHealthForms
     * const userHealthForms = await prisma.userHealthForm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userHealthFormWithIdOnly = await prisma.userHealthForm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserHealthFormFindManyArgs>(args?: SelectSubset<T, UserHealthFormFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserHealthForm.
     * @param {UserHealthFormCreateArgs} args - Arguments to create a UserHealthForm.
     * @example
     * // Create one UserHealthForm
     * const UserHealthForm = await prisma.userHealthForm.create({
     *   data: {
     *     // ... data to create a UserHealthForm
     *   }
     * })
     * 
     */
    create<T extends UserHealthFormCreateArgs>(args: SelectSubset<T, UserHealthFormCreateArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserHealthForms.
     * @param {UserHealthFormCreateManyArgs} args - Arguments to create many UserHealthForms.
     * @example
     * // Create many UserHealthForms
     * const userHealthForm = await prisma.userHealthForm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserHealthFormCreateManyArgs>(args?: SelectSubset<T, UserHealthFormCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserHealthForms and returns the data saved in the database.
     * @param {UserHealthFormCreateManyAndReturnArgs} args - Arguments to create many UserHealthForms.
     * @example
     * // Create many UserHealthForms
     * const userHealthForm = await prisma.userHealthForm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserHealthForms and only return the `id`
     * const userHealthFormWithIdOnly = await prisma.userHealthForm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserHealthFormCreateManyAndReturnArgs>(args?: SelectSubset<T, UserHealthFormCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserHealthForm.
     * @param {UserHealthFormDeleteArgs} args - Arguments to delete one UserHealthForm.
     * @example
     * // Delete one UserHealthForm
     * const UserHealthForm = await prisma.userHealthForm.delete({
     *   where: {
     *     // ... filter to delete one UserHealthForm
     *   }
     * })
     * 
     */
    delete<T extends UserHealthFormDeleteArgs>(args: SelectSubset<T, UserHealthFormDeleteArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserHealthForm.
     * @param {UserHealthFormUpdateArgs} args - Arguments to update one UserHealthForm.
     * @example
     * // Update one UserHealthForm
     * const userHealthForm = await prisma.userHealthForm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserHealthFormUpdateArgs>(args: SelectSubset<T, UserHealthFormUpdateArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserHealthForms.
     * @param {UserHealthFormDeleteManyArgs} args - Arguments to filter UserHealthForms to delete.
     * @example
     * // Delete a few UserHealthForms
     * const { count } = await prisma.userHealthForm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserHealthFormDeleteManyArgs>(args?: SelectSubset<T, UserHealthFormDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserHealthForms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHealthFormUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserHealthForms
     * const userHealthForm = await prisma.userHealthForm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserHealthFormUpdateManyArgs>(args: SelectSubset<T, UserHealthFormUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserHealthForms and returns the data updated in the database.
     * @param {UserHealthFormUpdateManyAndReturnArgs} args - Arguments to update many UserHealthForms.
     * @example
     * // Update many UserHealthForms
     * const userHealthForm = await prisma.userHealthForm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserHealthForms and only return the `id`
     * const userHealthFormWithIdOnly = await prisma.userHealthForm.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserHealthFormUpdateManyAndReturnArgs>(args: SelectSubset<T, UserHealthFormUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserHealthForm.
     * @param {UserHealthFormUpsertArgs} args - Arguments to update or create a UserHealthForm.
     * @example
     * // Update or create a UserHealthForm
     * const userHealthForm = await prisma.userHealthForm.upsert({
     *   create: {
     *     // ... data to create a UserHealthForm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserHealthForm we want to update
     *   }
     * })
     */
    upsert<T extends UserHealthFormUpsertArgs>(args: SelectSubset<T, UserHealthFormUpsertArgs<ExtArgs>>): Prisma__UserHealthFormClient<$Result.GetResult<Prisma.$UserHealthFormPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserHealthForms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHealthFormCountArgs} args - Arguments to filter UserHealthForms to count.
     * @example
     * // Count the number of UserHealthForms
     * const count = await prisma.userHealthForm.count({
     *   where: {
     *     // ... the filter for the UserHealthForms we want to count
     *   }
     * })
    **/
    count<T extends UserHealthFormCountArgs>(
      args?: Subset<T, UserHealthFormCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserHealthFormCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserHealthForm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHealthFormAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserHealthFormAggregateArgs>(args: Subset<T, UserHealthFormAggregateArgs>): Prisma.PrismaPromise<GetUserHealthFormAggregateType<T>>

    /**
     * Group by UserHealthForm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHealthFormGroupByArgs} args - Group by arguments.
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
      T extends UserHealthFormGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserHealthFormGroupByArgs['orderBy'] }
        : { orderBy?: UserHealthFormGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserHealthFormGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserHealthFormGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserHealthForm model
   */
  readonly fields: UserHealthFormFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserHealthForm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserHealthFormClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the UserHealthForm model
   */
  interface UserHealthFormFieldRefs {
    readonly id: FieldRef<"UserHealthForm", 'String'>
    readonly userId: FieldRef<"UserHealthForm", 'String'>
    readonly lastName: FieldRef<"UserHealthForm", 'String'>
    readonly firstName: FieldRef<"UserHealthForm", 'String'>
    readonly middleInitial: FieldRef<"UserHealthForm", 'String'>
    readonly birthdate: FieldRef<"UserHealthForm", 'DateTime'>
    readonly gender: FieldRef<"UserHealthForm", 'String'>
    readonly birthPlace: FieldRef<"UserHealthForm", 'String'>
    readonly addressLine1: FieldRef<"UserHealthForm", 'String'>
    readonly addressLine2: FieldRef<"UserHealthForm", 'String'>
    readonly city: FieldRef<"UserHealthForm", 'String'>
    readonly state: FieldRef<"UserHealthForm", 'String'>
    readonly postalCode: FieldRef<"UserHealthForm", 'String'>
    readonly guardianName: FieldRef<"UserHealthForm", 'String'>
    readonly guardianContact: FieldRef<"UserHealthForm", 'String'>
    readonly emergencyContact: FieldRef<"UserHealthForm", 'String'>
    readonly relationship: FieldRef<"UserHealthForm", 'String'>
    readonly emergencyNumber: FieldRef<"UserHealthForm", 'String'>
    readonly bloodType: FieldRef<"UserHealthForm", 'String'>
    readonly signaturePath: FieldRef<"UserHealthForm", 'String'>
    readonly dateSigned: FieldRef<"UserHealthForm", 'DateTime'>
    readonly pastIllnesses: FieldRef<"UserHealthForm", 'String'>
    readonly hospitalization: FieldRef<"UserHealthForm", 'String'>
    readonly medications: FieldRef<"UserHealthForm", 'String'>
    readonly allergies: FieldRef<"UserHealthForm", 'Boolean'>
    readonly immunized: FieldRef<"UserHealthForm", 'Boolean'>
    readonly communicableDisease: FieldRef<"UserHealthForm", 'Boolean'>
    readonly asthmatic: FieldRef<"UserHealthForm", 'Boolean'>
    readonly chronicIllness: FieldRef<"UserHealthForm", 'Boolean'>
    readonly hiking: FieldRef<"UserHealthForm", 'Boolean'>
    readonly dancing: FieldRef<"UserHealthForm", 'Boolean'>
    readonly swimming: FieldRef<"UserHealthForm", 'Boolean'>
    readonly basketball: FieldRef<"UserHealthForm", 'Boolean'>
    readonly ballgames: FieldRef<"UserHealthForm", 'Boolean'>
    readonly jogging: FieldRef<"UserHealthForm", 'Boolean'>
    readonly football: FieldRef<"UserHealthForm", 'Boolean'>
    readonly badminton: FieldRef<"UserHealthForm", 'Boolean'>
    readonly calisthenics: FieldRef<"UserHealthForm", 'Boolean'>
    readonly wallclimbing: FieldRef<"UserHealthForm", 'Boolean'>
    readonly notFitActivities: FieldRef<"UserHealthForm", 'String'>
    readonly medicationPermission: FieldRef<"UserHealthForm", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * UserHealthForm findUnique
   */
  export type UserHealthFormFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which UserHealthForm to fetch.
     */
    where: UserHealthFormWhereUniqueInput
  }

  /**
   * UserHealthForm findUniqueOrThrow
   */
  export type UserHealthFormFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which UserHealthForm to fetch.
     */
    where: UserHealthFormWhereUniqueInput
  }

  /**
   * UserHealthForm findFirst
   */
  export type UserHealthFormFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which UserHealthForm to fetch.
     */
    where?: UserHealthFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserHealthForms to fetch.
     */
    orderBy?: UserHealthFormOrderByWithRelationInput | UserHealthFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserHealthForms.
     */
    cursor?: UserHealthFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserHealthForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserHealthForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserHealthForms.
     */
    distinct?: UserHealthFormScalarFieldEnum | UserHealthFormScalarFieldEnum[]
  }

  /**
   * UserHealthForm findFirstOrThrow
   */
  export type UserHealthFormFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which UserHealthForm to fetch.
     */
    where?: UserHealthFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserHealthForms to fetch.
     */
    orderBy?: UserHealthFormOrderByWithRelationInput | UserHealthFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserHealthForms.
     */
    cursor?: UserHealthFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserHealthForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserHealthForms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserHealthForms.
     */
    distinct?: UserHealthFormScalarFieldEnum | UserHealthFormScalarFieldEnum[]
  }

  /**
   * UserHealthForm findMany
   */
  export type UserHealthFormFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * Filter, which UserHealthForms to fetch.
     */
    where?: UserHealthFormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserHealthForms to fetch.
     */
    orderBy?: UserHealthFormOrderByWithRelationInput | UserHealthFormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserHealthForms.
     */
    cursor?: UserHealthFormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserHealthForms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserHealthForms.
     */
    skip?: number
    distinct?: UserHealthFormScalarFieldEnum | UserHealthFormScalarFieldEnum[]
  }

  /**
   * UserHealthForm create
   */
  export type UserHealthFormCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * The data needed to create a UserHealthForm.
     */
    data: XOR<UserHealthFormCreateInput, UserHealthFormUncheckedCreateInput>
  }

  /**
   * UserHealthForm createMany
   */
  export type UserHealthFormCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserHealthForms.
     */
    data: UserHealthFormCreateManyInput | UserHealthFormCreateManyInput[]
  }

  /**
   * UserHealthForm createManyAndReturn
   */
  export type UserHealthFormCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * The data used to create many UserHealthForms.
     */
    data: UserHealthFormCreateManyInput | UserHealthFormCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserHealthForm update
   */
  export type UserHealthFormUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * The data needed to update a UserHealthForm.
     */
    data: XOR<UserHealthFormUpdateInput, UserHealthFormUncheckedUpdateInput>
    /**
     * Choose, which UserHealthForm to update.
     */
    where: UserHealthFormWhereUniqueInput
  }

  /**
   * UserHealthForm updateMany
   */
  export type UserHealthFormUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserHealthForms.
     */
    data: XOR<UserHealthFormUpdateManyMutationInput, UserHealthFormUncheckedUpdateManyInput>
    /**
     * Filter which UserHealthForms to update
     */
    where?: UserHealthFormWhereInput
    /**
     * Limit how many UserHealthForms to update.
     */
    limit?: number
  }

  /**
   * UserHealthForm updateManyAndReturn
   */
  export type UserHealthFormUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * The data used to update UserHealthForms.
     */
    data: XOR<UserHealthFormUpdateManyMutationInput, UserHealthFormUncheckedUpdateManyInput>
    /**
     * Filter which UserHealthForms to update
     */
    where?: UserHealthFormWhereInput
    /**
     * Limit how many UserHealthForms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserHealthForm upsert
   */
  export type UserHealthFormUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * The filter to search for the UserHealthForm to update in case it exists.
     */
    where: UserHealthFormWhereUniqueInput
    /**
     * In case the UserHealthForm found by the `where` argument doesn't exist, create a new UserHealthForm with this data.
     */
    create: XOR<UserHealthFormCreateInput, UserHealthFormUncheckedCreateInput>
    /**
     * In case the UserHealthForm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserHealthFormUpdateInput, UserHealthFormUncheckedUpdateInput>
  }

  /**
   * UserHealthForm delete
   */
  export type UserHealthFormDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
    /**
     * Filter which UserHealthForm to delete.
     */
    where: UserHealthFormWhereUniqueInput
  }

  /**
   * UserHealthForm deleteMany
   */
  export type UserHealthFormDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserHealthForms to delete
     */
    where?: UserHealthFormWhereInput
    /**
     * Limit how many UserHealthForms to delete.
     */
    limit?: number
  }

  /**
   * UserHealthForm without action
   */
  export type UserHealthFormDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHealthForm
     */
    select?: UserHealthFormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHealthForm
     */
    omit?: UserHealthFormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHealthFormInclude<ExtArgs> | null
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
   * Model ConsultationDate
   */

  export type AggregateConsultationDate = {
    _count: ConsultationDateCountAggregateOutputType | null
    _min: ConsultationDateMinAggregateOutputType | null
    _max: ConsultationDateMaxAggregateOutputType | null
  }

  export type ConsultationDateMinAggregateOutputType = {
    id: string | null
    date: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConsultationDateMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConsultationDateCountAggregateOutputType = {
    id: number
    date: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConsultationDateMinAggregateInputType = {
    id?: true
    date?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConsultationDateMaxAggregateInputType = {
    id?: true
    date?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConsultationDateCountAggregateInputType = {
    id?: true
    date?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConsultationDateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConsultationDate to aggregate.
     */
    where?: ConsultationDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationDates to fetch.
     */
    orderBy?: ConsultationDateOrderByWithRelationInput | ConsultationDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsultationDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConsultationDates
    **/
    _count?: true | ConsultationDateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultationDateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultationDateMaxAggregateInputType
  }

  export type GetConsultationDateAggregateType<T extends ConsultationDateAggregateArgs> = {
        [P in keyof T & keyof AggregateConsultationDate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsultationDate[P]>
      : GetScalarType<T[P], AggregateConsultationDate[P]>
  }




  export type ConsultationDateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsultationDateWhereInput
    orderBy?: ConsultationDateOrderByWithAggregationInput | ConsultationDateOrderByWithAggregationInput[]
    by: ConsultationDateScalarFieldEnum[] | ConsultationDateScalarFieldEnum
    having?: ConsultationDateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultationDateCountAggregateInputType | true
    _min?: ConsultationDateMinAggregateInputType
    _max?: ConsultationDateMaxAggregateInputType
  }

  export type ConsultationDateGroupByOutputType = {
    id: string
    date: Date
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ConsultationDateCountAggregateOutputType | null
    _min: ConsultationDateMinAggregateOutputType | null
    _max: ConsultationDateMaxAggregateOutputType | null
  }

  type GetConsultationDateGroupByPayload<T extends ConsultationDateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultationDateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultationDateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultationDateGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultationDateGroupByOutputType[P]>
        }
      >
    >


  export type ConsultationDateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    timeSlots?: boolean | ConsultationDate$timeSlotsArgs<ExtArgs>
    _count?: boolean | ConsultationDateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consultationDate"]>

  export type ConsultationDateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["consultationDate"]>

  export type ConsultationDateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["consultationDate"]>

  export type ConsultationDateSelectScalar = {
    id?: boolean
    date?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConsultationDateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["consultationDate"]>
  export type ConsultationDateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeSlots?: boolean | ConsultationDate$timeSlotsArgs<ExtArgs>
    _count?: boolean | ConsultationDateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConsultationDateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ConsultationDateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ConsultationDatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConsultationDate"
    objects: {
      timeSlots: Prisma.$TimeSlotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["consultationDate"]>
    composites: {}
  }

  type ConsultationDateGetPayload<S extends boolean | null | undefined | ConsultationDateDefaultArgs> = $Result.GetResult<Prisma.$ConsultationDatePayload, S>

  type ConsultationDateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsultationDateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultationDateCountAggregateInputType | true
    }

  export interface ConsultationDateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConsultationDate'], meta: { name: 'ConsultationDate' } }
    /**
     * Find zero or one ConsultationDate that matches the filter.
     * @param {ConsultationDateFindUniqueArgs} args - Arguments to find a ConsultationDate
     * @example
     * // Get one ConsultationDate
     * const consultationDate = await prisma.consultationDate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsultationDateFindUniqueArgs>(args: SelectSubset<T, ConsultationDateFindUniqueArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConsultationDate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsultationDateFindUniqueOrThrowArgs} args - Arguments to find a ConsultationDate
     * @example
     * // Get one ConsultationDate
     * const consultationDate = await prisma.consultationDate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsultationDateFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsultationDateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConsultationDate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationDateFindFirstArgs} args - Arguments to find a ConsultationDate
     * @example
     * // Get one ConsultationDate
     * const consultationDate = await prisma.consultationDate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsultationDateFindFirstArgs>(args?: SelectSubset<T, ConsultationDateFindFirstArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConsultationDate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationDateFindFirstOrThrowArgs} args - Arguments to find a ConsultationDate
     * @example
     * // Get one ConsultationDate
     * const consultationDate = await prisma.consultationDate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsultationDateFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsultationDateFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConsultationDates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationDateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConsultationDates
     * const consultationDates = await prisma.consultationDate.findMany()
     * 
     * // Get first 10 ConsultationDates
     * const consultationDates = await prisma.consultationDate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consultationDateWithIdOnly = await prisma.consultationDate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsultationDateFindManyArgs>(args?: SelectSubset<T, ConsultationDateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConsultationDate.
     * @param {ConsultationDateCreateArgs} args - Arguments to create a ConsultationDate.
     * @example
     * // Create one ConsultationDate
     * const ConsultationDate = await prisma.consultationDate.create({
     *   data: {
     *     // ... data to create a ConsultationDate
     *   }
     * })
     * 
     */
    create<T extends ConsultationDateCreateArgs>(args: SelectSubset<T, ConsultationDateCreateArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConsultationDates.
     * @param {ConsultationDateCreateManyArgs} args - Arguments to create many ConsultationDates.
     * @example
     * // Create many ConsultationDates
     * const consultationDate = await prisma.consultationDate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsultationDateCreateManyArgs>(args?: SelectSubset<T, ConsultationDateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConsultationDates and returns the data saved in the database.
     * @param {ConsultationDateCreateManyAndReturnArgs} args - Arguments to create many ConsultationDates.
     * @example
     * // Create many ConsultationDates
     * const consultationDate = await prisma.consultationDate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConsultationDates and only return the `id`
     * const consultationDateWithIdOnly = await prisma.consultationDate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsultationDateCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsultationDateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConsultationDate.
     * @param {ConsultationDateDeleteArgs} args - Arguments to delete one ConsultationDate.
     * @example
     * // Delete one ConsultationDate
     * const ConsultationDate = await prisma.consultationDate.delete({
     *   where: {
     *     // ... filter to delete one ConsultationDate
     *   }
     * })
     * 
     */
    delete<T extends ConsultationDateDeleteArgs>(args: SelectSubset<T, ConsultationDateDeleteArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConsultationDate.
     * @param {ConsultationDateUpdateArgs} args - Arguments to update one ConsultationDate.
     * @example
     * // Update one ConsultationDate
     * const consultationDate = await prisma.consultationDate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsultationDateUpdateArgs>(args: SelectSubset<T, ConsultationDateUpdateArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConsultationDates.
     * @param {ConsultationDateDeleteManyArgs} args - Arguments to filter ConsultationDates to delete.
     * @example
     * // Delete a few ConsultationDates
     * const { count } = await prisma.consultationDate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsultationDateDeleteManyArgs>(args?: SelectSubset<T, ConsultationDateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConsultationDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationDateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConsultationDates
     * const consultationDate = await prisma.consultationDate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsultationDateUpdateManyArgs>(args: SelectSubset<T, ConsultationDateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConsultationDates and returns the data updated in the database.
     * @param {ConsultationDateUpdateManyAndReturnArgs} args - Arguments to update many ConsultationDates.
     * @example
     * // Update many ConsultationDates
     * const consultationDate = await prisma.consultationDate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConsultationDates and only return the `id`
     * const consultationDateWithIdOnly = await prisma.consultationDate.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConsultationDateUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsultationDateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConsultationDate.
     * @param {ConsultationDateUpsertArgs} args - Arguments to update or create a ConsultationDate.
     * @example
     * // Update or create a ConsultationDate
     * const consultationDate = await prisma.consultationDate.upsert({
     *   create: {
     *     // ... data to create a ConsultationDate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConsultationDate we want to update
     *   }
     * })
     */
    upsert<T extends ConsultationDateUpsertArgs>(args: SelectSubset<T, ConsultationDateUpsertArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConsultationDates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationDateCountArgs} args - Arguments to filter ConsultationDates to count.
     * @example
     * // Count the number of ConsultationDates
     * const count = await prisma.consultationDate.count({
     *   where: {
     *     // ... the filter for the ConsultationDates we want to count
     *   }
     * })
    **/
    count<T extends ConsultationDateCountArgs>(
      args?: Subset<T, ConsultationDateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultationDateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConsultationDate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationDateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConsultationDateAggregateArgs>(args: Subset<T, ConsultationDateAggregateArgs>): Prisma.PrismaPromise<GetConsultationDateAggregateType<T>>

    /**
     * Group by ConsultationDate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultationDateGroupByArgs} args - Group by arguments.
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
      T extends ConsultationDateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsultationDateGroupByArgs['orderBy'] }
        : { orderBy?: ConsultationDateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConsultationDateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultationDateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConsultationDate model
   */
  readonly fields: ConsultationDateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConsultationDate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsultationDateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    timeSlots<T extends ConsultationDate$timeSlotsArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDate$timeSlotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ConsultationDate model
   */
  interface ConsultationDateFieldRefs {
    readonly id: FieldRef<"ConsultationDate", 'String'>
    readonly date: FieldRef<"ConsultationDate", 'DateTime'>
    readonly isActive: FieldRef<"ConsultationDate", 'Boolean'>
    readonly createdAt: FieldRef<"ConsultationDate", 'DateTime'>
    readonly updatedAt: FieldRef<"ConsultationDate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConsultationDate findUnique
   */
  export type ConsultationDateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationDate to fetch.
     */
    where: ConsultationDateWhereUniqueInput
  }

  /**
   * ConsultationDate findUniqueOrThrow
   */
  export type ConsultationDateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationDate to fetch.
     */
    where: ConsultationDateWhereUniqueInput
  }

  /**
   * ConsultationDate findFirst
   */
  export type ConsultationDateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationDate to fetch.
     */
    where?: ConsultationDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationDates to fetch.
     */
    orderBy?: ConsultationDateOrderByWithRelationInput | ConsultationDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConsultationDates.
     */
    cursor?: ConsultationDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConsultationDates.
     */
    distinct?: ConsultationDateScalarFieldEnum | ConsultationDateScalarFieldEnum[]
  }

  /**
   * ConsultationDate findFirstOrThrow
   */
  export type ConsultationDateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationDate to fetch.
     */
    where?: ConsultationDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationDates to fetch.
     */
    orderBy?: ConsultationDateOrderByWithRelationInput | ConsultationDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConsultationDates.
     */
    cursor?: ConsultationDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationDates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConsultationDates.
     */
    distinct?: ConsultationDateScalarFieldEnum | ConsultationDateScalarFieldEnum[]
  }

  /**
   * ConsultationDate findMany
   */
  export type ConsultationDateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * Filter, which ConsultationDates to fetch.
     */
    where?: ConsultationDateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsultationDates to fetch.
     */
    orderBy?: ConsultationDateOrderByWithRelationInput | ConsultationDateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConsultationDates.
     */
    cursor?: ConsultationDateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsultationDates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsultationDates.
     */
    skip?: number
    distinct?: ConsultationDateScalarFieldEnum | ConsultationDateScalarFieldEnum[]
  }

  /**
   * ConsultationDate create
   */
  export type ConsultationDateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * The data needed to create a ConsultationDate.
     */
    data: XOR<ConsultationDateCreateInput, ConsultationDateUncheckedCreateInput>
  }

  /**
   * ConsultationDate createMany
   */
  export type ConsultationDateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConsultationDates.
     */
    data: ConsultationDateCreateManyInput | ConsultationDateCreateManyInput[]
  }

  /**
   * ConsultationDate createManyAndReturn
   */
  export type ConsultationDateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * The data used to create many ConsultationDates.
     */
    data: ConsultationDateCreateManyInput | ConsultationDateCreateManyInput[]
  }

  /**
   * ConsultationDate update
   */
  export type ConsultationDateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * The data needed to update a ConsultationDate.
     */
    data: XOR<ConsultationDateUpdateInput, ConsultationDateUncheckedUpdateInput>
    /**
     * Choose, which ConsultationDate to update.
     */
    where: ConsultationDateWhereUniqueInput
  }

  /**
   * ConsultationDate updateMany
   */
  export type ConsultationDateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConsultationDates.
     */
    data: XOR<ConsultationDateUpdateManyMutationInput, ConsultationDateUncheckedUpdateManyInput>
    /**
     * Filter which ConsultationDates to update
     */
    where?: ConsultationDateWhereInput
    /**
     * Limit how many ConsultationDates to update.
     */
    limit?: number
  }

  /**
   * ConsultationDate updateManyAndReturn
   */
  export type ConsultationDateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * The data used to update ConsultationDates.
     */
    data: XOR<ConsultationDateUpdateManyMutationInput, ConsultationDateUncheckedUpdateManyInput>
    /**
     * Filter which ConsultationDates to update
     */
    where?: ConsultationDateWhereInput
    /**
     * Limit how many ConsultationDates to update.
     */
    limit?: number
  }

  /**
   * ConsultationDate upsert
   */
  export type ConsultationDateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * The filter to search for the ConsultationDate to update in case it exists.
     */
    where: ConsultationDateWhereUniqueInput
    /**
     * In case the ConsultationDate found by the `where` argument doesn't exist, create a new ConsultationDate with this data.
     */
    create: XOR<ConsultationDateCreateInput, ConsultationDateUncheckedCreateInput>
    /**
     * In case the ConsultationDate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsultationDateUpdateInput, ConsultationDateUncheckedUpdateInput>
  }

  /**
   * ConsultationDate delete
   */
  export type ConsultationDateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
    /**
     * Filter which ConsultationDate to delete.
     */
    where: ConsultationDateWhereUniqueInput
  }

  /**
   * ConsultationDate deleteMany
   */
  export type ConsultationDateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConsultationDates to delete
     */
    where?: ConsultationDateWhereInput
    /**
     * Limit how many ConsultationDates to delete.
     */
    limit?: number
  }

  /**
   * ConsultationDate.timeSlots
   */
  export type ConsultationDate$timeSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    where?: TimeSlotWhereInput
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    cursor?: TimeSlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * ConsultationDate without action
   */
  export type ConsultationDateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultationDate
     */
    select?: ConsultationDateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsultationDate
     */
    omit?: ConsultationDateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsultationDateInclude<ExtArgs> | null
  }


  /**
   * Model TimeSlot
   */

  export type AggregateTimeSlot = {
    _count: TimeSlotCountAggregateOutputType | null
    _min: TimeSlotMinAggregateOutputType | null
    _max: TimeSlotMaxAggregateOutputType | null
  }

  export type TimeSlotMinAggregateOutputType = {
    id: string | null
    startTime: string | null
    endTime: string | null
    isAvailable: boolean | null
    consultationDateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeSlotMaxAggregateOutputType = {
    id: string | null
    startTime: string | null
    endTime: string | null
    isAvailable: boolean | null
    consultationDateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeSlotCountAggregateOutputType = {
    id: number
    startTime: number
    endTime: number
    isAvailable: number
    consultationDateId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TimeSlotMinAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    isAvailable?: true
    consultationDateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeSlotMaxAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    isAvailable?: true
    consultationDateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeSlotCountAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    isAvailable?: true
    consultationDateId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TimeSlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeSlot to aggregate.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TimeSlots
    **/
    _count?: true | TimeSlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeSlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeSlotMaxAggregateInputType
  }

  export type GetTimeSlotAggregateType<T extends TimeSlotAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeSlot[P]>
      : GetScalarType<T[P], AggregateTimeSlot[P]>
  }




  export type TimeSlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeSlotWhereInput
    orderBy?: TimeSlotOrderByWithAggregationInput | TimeSlotOrderByWithAggregationInput[]
    by: TimeSlotScalarFieldEnum[] | TimeSlotScalarFieldEnum
    having?: TimeSlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeSlotCountAggregateInputType | true
    _min?: TimeSlotMinAggregateInputType
    _max?: TimeSlotMaxAggregateInputType
  }

  export type TimeSlotGroupByOutputType = {
    id: string
    startTime: string
    endTime: string
    isAvailable: boolean
    consultationDateId: string
    createdAt: Date
    updatedAt: Date
    _count: TimeSlotCountAggregateOutputType | null
    _min: TimeSlotMinAggregateOutputType | null
    _max: TimeSlotMaxAggregateOutputType | null
  }

  type GetTimeSlotGroupByPayload<T extends TimeSlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeSlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeSlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeSlotGroupByOutputType[P]>
            : GetScalarType<T[P], TimeSlotGroupByOutputType[P]>
        }
      >
    >


  export type TimeSlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    isAvailable?: boolean
    consultationDateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultationDate?: boolean | ConsultationDateDefaultArgs<ExtArgs>
    appointment?: boolean | TimeSlot$appointmentArgs<ExtArgs>
  }, ExtArgs["result"]["timeSlot"]>

  export type TimeSlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    isAvailable?: boolean
    consultationDateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultationDate?: boolean | ConsultationDateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeSlot"]>

  export type TimeSlotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    isAvailable?: boolean
    consultationDateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    consultationDate?: boolean | ConsultationDateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeSlot"]>

  export type TimeSlotSelectScalar = {
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    isAvailable?: boolean
    consultationDateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TimeSlotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "startTime" | "endTime" | "isAvailable" | "consultationDateId" | "createdAt" | "updatedAt", ExtArgs["result"]["timeSlot"]>
  export type TimeSlotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultationDate?: boolean | ConsultationDateDefaultArgs<ExtArgs>
    appointment?: boolean | TimeSlot$appointmentArgs<ExtArgs>
  }
  export type TimeSlotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultationDate?: boolean | ConsultationDateDefaultArgs<ExtArgs>
  }
  export type TimeSlotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consultationDate?: boolean | ConsultationDateDefaultArgs<ExtArgs>
  }

  export type $TimeSlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TimeSlot"
    objects: {
      consultationDate: Prisma.$ConsultationDatePayload<ExtArgs>
      appointment: Prisma.$AppointmentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      startTime: string
      endTime: string
      isAvailable: boolean
      consultationDateId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["timeSlot"]>
    composites: {}
  }

  type TimeSlotGetPayload<S extends boolean | null | undefined | TimeSlotDefaultArgs> = $Result.GetResult<Prisma.$TimeSlotPayload, S>

  type TimeSlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeSlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeSlotCountAggregateInputType | true
    }

  export interface TimeSlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TimeSlot'], meta: { name: 'TimeSlot' } }
    /**
     * Find zero or one TimeSlot that matches the filter.
     * @param {TimeSlotFindUniqueArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeSlotFindUniqueArgs>(args: SelectSubset<T, TimeSlotFindUniqueArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TimeSlot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeSlotFindUniqueOrThrowArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeSlotFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeSlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeSlot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindFirstArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeSlotFindFirstArgs>(args?: SelectSubset<T, TimeSlotFindFirstArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TimeSlot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindFirstOrThrowArgs} args - Arguments to find a TimeSlot
     * @example
     * // Get one TimeSlot
     * const timeSlot = await prisma.timeSlot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeSlotFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeSlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TimeSlots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TimeSlots
     * const timeSlots = await prisma.timeSlot.findMany()
     * 
     * // Get first 10 TimeSlots
     * const timeSlots = await prisma.timeSlot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeSlotWithIdOnly = await prisma.timeSlot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeSlotFindManyArgs>(args?: SelectSubset<T, TimeSlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TimeSlot.
     * @param {TimeSlotCreateArgs} args - Arguments to create a TimeSlot.
     * @example
     * // Create one TimeSlot
     * const TimeSlot = await prisma.timeSlot.create({
     *   data: {
     *     // ... data to create a TimeSlot
     *   }
     * })
     * 
     */
    create<T extends TimeSlotCreateArgs>(args: SelectSubset<T, TimeSlotCreateArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TimeSlots.
     * @param {TimeSlotCreateManyArgs} args - Arguments to create many TimeSlots.
     * @example
     * // Create many TimeSlots
     * const timeSlot = await prisma.timeSlot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeSlotCreateManyArgs>(args?: SelectSubset<T, TimeSlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TimeSlots and returns the data saved in the database.
     * @param {TimeSlotCreateManyAndReturnArgs} args - Arguments to create many TimeSlots.
     * @example
     * // Create many TimeSlots
     * const timeSlot = await prisma.timeSlot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TimeSlots and only return the `id`
     * const timeSlotWithIdOnly = await prisma.timeSlot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeSlotCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeSlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TimeSlot.
     * @param {TimeSlotDeleteArgs} args - Arguments to delete one TimeSlot.
     * @example
     * // Delete one TimeSlot
     * const TimeSlot = await prisma.timeSlot.delete({
     *   where: {
     *     // ... filter to delete one TimeSlot
     *   }
     * })
     * 
     */
    delete<T extends TimeSlotDeleteArgs>(args: SelectSubset<T, TimeSlotDeleteArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TimeSlot.
     * @param {TimeSlotUpdateArgs} args - Arguments to update one TimeSlot.
     * @example
     * // Update one TimeSlot
     * const timeSlot = await prisma.timeSlot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeSlotUpdateArgs>(args: SelectSubset<T, TimeSlotUpdateArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TimeSlots.
     * @param {TimeSlotDeleteManyArgs} args - Arguments to filter TimeSlots to delete.
     * @example
     * // Delete a few TimeSlots
     * const { count } = await prisma.timeSlot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeSlotDeleteManyArgs>(args?: SelectSubset<T, TimeSlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TimeSlots
     * const timeSlot = await prisma.timeSlot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeSlotUpdateManyArgs>(args: SelectSubset<T, TimeSlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TimeSlots and returns the data updated in the database.
     * @param {TimeSlotUpdateManyAndReturnArgs} args - Arguments to update many TimeSlots.
     * @example
     * // Update many TimeSlots
     * const timeSlot = await prisma.timeSlot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TimeSlots and only return the `id`
     * const timeSlotWithIdOnly = await prisma.timeSlot.updateManyAndReturn({
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
    updateManyAndReturn<T extends TimeSlotUpdateManyAndReturnArgs>(args: SelectSubset<T, TimeSlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TimeSlot.
     * @param {TimeSlotUpsertArgs} args - Arguments to update or create a TimeSlot.
     * @example
     * // Update or create a TimeSlot
     * const timeSlot = await prisma.timeSlot.upsert({
     *   create: {
     *     // ... data to create a TimeSlot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TimeSlot we want to update
     *   }
     * })
     */
    upsert<T extends TimeSlotUpsertArgs>(args: SelectSubset<T, TimeSlotUpsertArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TimeSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotCountArgs} args - Arguments to filter TimeSlots to count.
     * @example
     * // Count the number of TimeSlots
     * const count = await prisma.timeSlot.count({
     *   where: {
     *     // ... the filter for the TimeSlots we want to count
     *   }
     * })
    **/
    count<T extends TimeSlotCountArgs>(
      args?: Subset<T, TimeSlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeSlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TimeSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TimeSlotAggregateArgs>(args: Subset<T, TimeSlotAggregateArgs>): Prisma.PrismaPromise<GetTimeSlotAggregateType<T>>

    /**
     * Group by TimeSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeSlotGroupByArgs} args - Group by arguments.
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
      T extends TimeSlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeSlotGroupByArgs['orderBy'] }
        : { orderBy?: TimeSlotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TimeSlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TimeSlot model
   */
  readonly fields: TimeSlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TimeSlot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeSlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consultationDate<T extends ConsultationDateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConsultationDateDefaultArgs<ExtArgs>>): Prisma__ConsultationDateClient<$Result.GetResult<Prisma.$ConsultationDatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointment<T extends TimeSlot$appointmentArgs<ExtArgs> = {}>(args?: Subset<T, TimeSlot$appointmentArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TimeSlot model
   */
  interface TimeSlotFieldRefs {
    readonly id: FieldRef<"TimeSlot", 'String'>
    readonly startTime: FieldRef<"TimeSlot", 'String'>
    readonly endTime: FieldRef<"TimeSlot", 'String'>
    readonly isAvailable: FieldRef<"TimeSlot", 'Boolean'>
    readonly consultationDateId: FieldRef<"TimeSlot", 'String'>
    readonly createdAt: FieldRef<"TimeSlot", 'DateTime'>
    readonly updatedAt: FieldRef<"TimeSlot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TimeSlot findUnique
   */
  export type TimeSlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot findUniqueOrThrow
   */
  export type TimeSlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot findFirst
   */
  export type TimeSlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeSlots.
     */
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot findFirstOrThrow
   */
  export type TimeSlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlot to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TimeSlots.
     */
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot findMany
   */
  export type TimeSlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter, which TimeSlots to fetch.
     */
    where?: TimeSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TimeSlots to fetch.
     */
    orderBy?: TimeSlotOrderByWithRelationInput | TimeSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TimeSlots.
     */
    cursor?: TimeSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TimeSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TimeSlots.
     */
    skip?: number
    distinct?: TimeSlotScalarFieldEnum | TimeSlotScalarFieldEnum[]
  }

  /**
   * TimeSlot create
   */
  export type TimeSlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The data needed to create a TimeSlot.
     */
    data: XOR<TimeSlotCreateInput, TimeSlotUncheckedCreateInput>
  }

  /**
   * TimeSlot createMany
   */
  export type TimeSlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TimeSlots.
     */
    data: TimeSlotCreateManyInput | TimeSlotCreateManyInput[]
  }

  /**
   * TimeSlot createManyAndReturn
   */
  export type TimeSlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * The data used to create many TimeSlots.
     */
    data: TimeSlotCreateManyInput | TimeSlotCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeSlot update
   */
  export type TimeSlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The data needed to update a TimeSlot.
     */
    data: XOR<TimeSlotUpdateInput, TimeSlotUncheckedUpdateInput>
    /**
     * Choose, which TimeSlot to update.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot updateMany
   */
  export type TimeSlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TimeSlots.
     */
    data: XOR<TimeSlotUpdateManyMutationInput, TimeSlotUncheckedUpdateManyInput>
    /**
     * Filter which TimeSlots to update
     */
    where?: TimeSlotWhereInput
    /**
     * Limit how many TimeSlots to update.
     */
    limit?: number
  }

  /**
   * TimeSlot updateManyAndReturn
   */
  export type TimeSlotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * The data used to update TimeSlots.
     */
    data: XOR<TimeSlotUpdateManyMutationInput, TimeSlotUncheckedUpdateManyInput>
    /**
     * Filter which TimeSlots to update
     */
    where?: TimeSlotWhereInput
    /**
     * Limit how many TimeSlots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TimeSlot upsert
   */
  export type TimeSlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * The filter to search for the TimeSlot to update in case it exists.
     */
    where: TimeSlotWhereUniqueInput
    /**
     * In case the TimeSlot found by the `where` argument doesn't exist, create a new TimeSlot with this data.
     */
    create: XOR<TimeSlotCreateInput, TimeSlotUncheckedCreateInput>
    /**
     * In case the TimeSlot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeSlotUpdateInput, TimeSlotUncheckedUpdateInput>
  }

  /**
   * TimeSlot delete
   */
  export type TimeSlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
    /**
     * Filter which TimeSlot to delete.
     */
    where: TimeSlotWhereUniqueInput
  }

  /**
   * TimeSlot deleteMany
   */
  export type TimeSlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TimeSlots to delete
     */
    where?: TimeSlotWhereInput
    /**
     * Limit how many TimeSlots to delete.
     */
    limit?: number
  }

  /**
   * TimeSlot.appointment
   */
  export type TimeSlot$appointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
  }

  /**
   * TimeSlot without action
   */
  export type TimeSlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeSlot
     */
    select?: TimeSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TimeSlot
     */
    omit?: TimeSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeSlotInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    timeSlotId: string | null
    consultationType: string | null
    reasonForVisit: string | null
    additionalNotes: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    timeSlotId: string | null
    consultationType: string | null
    reasonForVisit: string | null
    additionalNotes: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    userId: number
    timeSlotId: number
    consultationType: number
    reasonForVisit: number
    additionalNotes: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    userId?: true
    timeSlotId?: true
    consultationType?: true
    reasonForVisit?: true
    additionalNotes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    userId?: true
    timeSlotId?: true
    consultationType?: true
    reasonForVisit?: true
    additionalNotes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    userId?: true
    timeSlotId?: true
    consultationType?: true
    reasonForVisit?: true
    additionalNotes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    userId: string
    timeSlotId: string
    consultationType: string
    reasonForVisit: string
    additionalNotes: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeSlotId?: boolean
    consultationType?: boolean
    reasonForVisit?: boolean
    additionalNotes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    timeSlot?: boolean | TimeSlotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeSlotId?: boolean
    consultationType?: boolean
    reasonForVisit?: boolean
    additionalNotes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    timeSlot?: boolean | TimeSlotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeSlotId?: boolean
    consultationType?: boolean
    reasonForVisit?: boolean
    additionalNotes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    timeSlot?: boolean | TimeSlotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    userId?: boolean
    timeSlotId?: boolean
    consultationType?: boolean
    reasonForVisit?: boolean
    additionalNotes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "timeSlotId" | "consultationType" | "reasonForVisit" | "additionalNotes" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    timeSlot?: boolean | TimeSlotDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    timeSlot?: boolean | TimeSlotDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    timeSlot?: boolean | TimeSlotDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      timeSlot: Prisma.$TimeSlotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      timeSlotId: string
      consultationType: string
      reasonForVisit: string
      additionalNotes: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
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
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
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
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    timeSlot<T extends TimeSlotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TimeSlotDefaultArgs<ExtArgs>>): Prisma__TimeSlotClient<$Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly userId: FieldRef<"Appointment", 'String'>
    readonly timeSlotId: FieldRef<"Appointment", 'String'>
    readonly consultationType: FieldRef<"Appointment", 'String'>
    readonly reasonForVisit: FieldRef<"Appointment", 'String'>
    readonly additionalNotes: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    name: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DepartmentMinAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: string
    name: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clearanceRequests?: boolean | Department$clearanceRequestsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["department"]>
  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clearanceRequests?: boolean | Department$clearanceRequestsArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      clearanceRequests: Prisma.$ClearanceRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {DepartmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.updateManyAndReturn({
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
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
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
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clearanceRequests<T extends Department$clearanceRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Department$clearanceRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Department model
   */
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'String'>
    readonly name: FieldRef<"Department", 'String'>
    readonly isActive: FieldRef<"Department", 'Boolean'>
    readonly createdAt: FieldRef<"Department", 'DateTime'>
    readonly updatedAt: FieldRef<"Department", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department updateManyAndReturn
   */
  export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to delete.
     */
    limit?: number
  }

  /**
   * Department.clearanceRequests
   */
  export type Department$clearanceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    where?: ClearanceRequestWhereInput
    orderBy?: ClearanceRequestOrderByWithRelationInput | ClearanceRequestOrderByWithRelationInput[]
    cursor?: ClearanceRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClearanceRequestScalarFieldEnum | ClearanceRequestScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model ClearanceRequest
   */

  export type AggregateClearanceRequest = {
    _count: ClearanceRequestCountAggregateOutputType | null
    _min: ClearanceRequestMinAggregateOutputType | null
    _max: ClearanceRequestMaxAggregateOutputType | null
  }

  export type ClearanceRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    departmentId: string | null
    reason: string | null
    otherReason: string | null
    purpose: string | null
    dateNeeded: Date | null
    additionalInfo: string | null
    status: string | null
    documentUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClearanceRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    departmentId: string | null
    reason: string | null
    otherReason: string | null
    purpose: string | null
    dateNeeded: Date | null
    additionalInfo: string | null
    status: string | null
    documentUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClearanceRequestCountAggregateOutputType = {
    id: number
    userId: number
    departmentId: number
    reason: number
    otherReason: number
    purpose: number
    dateNeeded: number
    additionalInfo: number
    status: number
    documentUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClearanceRequestMinAggregateInputType = {
    id?: true
    userId?: true
    departmentId?: true
    reason?: true
    otherReason?: true
    purpose?: true
    dateNeeded?: true
    additionalInfo?: true
    status?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClearanceRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    departmentId?: true
    reason?: true
    otherReason?: true
    purpose?: true
    dateNeeded?: true
    additionalInfo?: true
    status?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClearanceRequestCountAggregateInputType = {
    id?: true
    userId?: true
    departmentId?: true
    reason?: true
    otherReason?: true
    purpose?: true
    dateNeeded?: true
    additionalInfo?: true
    status?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClearanceRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClearanceRequest to aggregate.
     */
    where?: ClearanceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClearanceRequests to fetch.
     */
    orderBy?: ClearanceRequestOrderByWithRelationInput | ClearanceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClearanceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClearanceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClearanceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClearanceRequests
    **/
    _count?: true | ClearanceRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClearanceRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClearanceRequestMaxAggregateInputType
  }

  export type GetClearanceRequestAggregateType<T extends ClearanceRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateClearanceRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClearanceRequest[P]>
      : GetScalarType<T[P], AggregateClearanceRequest[P]>
  }




  export type ClearanceRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClearanceRequestWhereInput
    orderBy?: ClearanceRequestOrderByWithAggregationInput | ClearanceRequestOrderByWithAggregationInput[]
    by: ClearanceRequestScalarFieldEnum[] | ClearanceRequestScalarFieldEnum
    having?: ClearanceRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClearanceRequestCountAggregateInputType | true
    _min?: ClearanceRequestMinAggregateInputType
    _max?: ClearanceRequestMaxAggregateInputType
  }

  export type ClearanceRequestGroupByOutputType = {
    id: string
    userId: string
    departmentId: string
    reason: string
    otherReason: string | null
    purpose: string
    dateNeeded: Date
    additionalInfo: string | null
    status: string
    documentUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClearanceRequestCountAggregateOutputType | null
    _min: ClearanceRequestMinAggregateOutputType | null
    _max: ClearanceRequestMaxAggregateOutputType | null
  }

  type GetClearanceRequestGroupByPayload<T extends ClearanceRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClearanceRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClearanceRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClearanceRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ClearanceRequestGroupByOutputType[P]>
        }
      >
    >


  export type ClearanceRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    departmentId?: boolean
    reason?: boolean
    otherReason?: boolean
    purpose?: boolean
    dateNeeded?: boolean
    additionalInfo?: boolean
    status?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clearanceRequest"]>

  export type ClearanceRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    departmentId?: boolean
    reason?: boolean
    otherReason?: boolean
    purpose?: boolean
    dateNeeded?: boolean
    additionalInfo?: boolean
    status?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clearanceRequest"]>

  export type ClearanceRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    departmentId?: boolean
    reason?: boolean
    otherReason?: boolean
    purpose?: boolean
    dateNeeded?: boolean
    additionalInfo?: boolean
    status?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clearanceRequest"]>

  export type ClearanceRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    departmentId?: boolean
    reason?: boolean
    otherReason?: boolean
    purpose?: boolean
    dateNeeded?: boolean
    additionalInfo?: boolean
    status?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClearanceRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "departmentId" | "reason" | "otherReason" | "purpose" | "dateNeeded" | "additionalInfo" | "status" | "documentUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["clearanceRequest"]>
  export type ClearanceRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }
  export type ClearanceRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }
  export type ClearanceRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }

  export type $ClearanceRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClearanceRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      department: Prisma.$DepartmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      departmentId: string
      reason: string
      otherReason: string | null
      purpose: string
      dateNeeded: Date
      additionalInfo: string | null
      status: string
      documentUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clearanceRequest"]>
    composites: {}
  }

  type ClearanceRequestGetPayload<S extends boolean | null | undefined | ClearanceRequestDefaultArgs> = $Result.GetResult<Prisma.$ClearanceRequestPayload, S>

  type ClearanceRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClearanceRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClearanceRequestCountAggregateInputType | true
    }

  export interface ClearanceRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClearanceRequest'], meta: { name: 'ClearanceRequest' } }
    /**
     * Find zero or one ClearanceRequest that matches the filter.
     * @param {ClearanceRequestFindUniqueArgs} args - Arguments to find a ClearanceRequest
     * @example
     * // Get one ClearanceRequest
     * const clearanceRequest = await prisma.clearanceRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClearanceRequestFindUniqueArgs>(args: SelectSubset<T, ClearanceRequestFindUniqueArgs<ExtArgs>>): Prisma__ClearanceRequestClient<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClearanceRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClearanceRequestFindUniqueOrThrowArgs} args - Arguments to find a ClearanceRequest
     * @example
     * // Get one ClearanceRequest
     * const clearanceRequest = await prisma.clearanceRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClearanceRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ClearanceRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClearanceRequestClient<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClearanceRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceRequestFindFirstArgs} args - Arguments to find a ClearanceRequest
     * @example
     * // Get one ClearanceRequest
     * const clearanceRequest = await prisma.clearanceRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClearanceRequestFindFirstArgs>(args?: SelectSubset<T, ClearanceRequestFindFirstArgs<ExtArgs>>): Prisma__ClearanceRequestClient<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClearanceRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceRequestFindFirstOrThrowArgs} args - Arguments to find a ClearanceRequest
     * @example
     * // Get one ClearanceRequest
     * const clearanceRequest = await prisma.clearanceRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClearanceRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ClearanceRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClearanceRequestClient<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClearanceRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClearanceRequests
     * const clearanceRequests = await prisma.clearanceRequest.findMany()
     * 
     * // Get first 10 ClearanceRequests
     * const clearanceRequests = await prisma.clearanceRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clearanceRequestWithIdOnly = await prisma.clearanceRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClearanceRequestFindManyArgs>(args?: SelectSubset<T, ClearanceRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClearanceRequest.
     * @param {ClearanceRequestCreateArgs} args - Arguments to create a ClearanceRequest.
     * @example
     * // Create one ClearanceRequest
     * const ClearanceRequest = await prisma.clearanceRequest.create({
     *   data: {
     *     // ... data to create a ClearanceRequest
     *   }
     * })
     * 
     */
    create<T extends ClearanceRequestCreateArgs>(args: SelectSubset<T, ClearanceRequestCreateArgs<ExtArgs>>): Prisma__ClearanceRequestClient<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClearanceRequests.
     * @param {ClearanceRequestCreateManyArgs} args - Arguments to create many ClearanceRequests.
     * @example
     * // Create many ClearanceRequests
     * const clearanceRequest = await prisma.clearanceRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClearanceRequestCreateManyArgs>(args?: SelectSubset<T, ClearanceRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClearanceRequests and returns the data saved in the database.
     * @param {ClearanceRequestCreateManyAndReturnArgs} args - Arguments to create many ClearanceRequests.
     * @example
     * // Create many ClearanceRequests
     * const clearanceRequest = await prisma.clearanceRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClearanceRequests and only return the `id`
     * const clearanceRequestWithIdOnly = await prisma.clearanceRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClearanceRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ClearanceRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClearanceRequest.
     * @param {ClearanceRequestDeleteArgs} args - Arguments to delete one ClearanceRequest.
     * @example
     * // Delete one ClearanceRequest
     * const ClearanceRequest = await prisma.clearanceRequest.delete({
     *   where: {
     *     // ... filter to delete one ClearanceRequest
     *   }
     * })
     * 
     */
    delete<T extends ClearanceRequestDeleteArgs>(args: SelectSubset<T, ClearanceRequestDeleteArgs<ExtArgs>>): Prisma__ClearanceRequestClient<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClearanceRequest.
     * @param {ClearanceRequestUpdateArgs} args - Arguments to update one ClearanceRequest.
     * @example
     * // Update one ClearanceRequest
     * const clearanceRequest = await prisma.clearanceRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClearanceRequestUpdateArgs>(args: SelectSubset<T, ClearanceRequestUpdateArgs<ExtArgs>>): Prisma__ClearanceRequestClient<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClearanceRequests.
     * @param {ClearanceRequestDeleteManyArgs} args - Arguments to filter ClearanceRequests to delete.
     * @example
     * // Delete a few ClearanceRequests
     * const { count } = await prisma.clearanceRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClearanceRequestDeleteManyArgs>(args?: SelectSubset<T, ClearanceRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClearanceRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClearanceRequests
     * const clearanceRequest = await prisma.clearanceRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClearanceRequestUpdateManyArgs>(args: SelectSubset<T, ClearanceRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClearanceRequests and returns the data updated in the database.
     * @param {ClearanceRequestUpdateManyAndReturnArgs} args - Arguments to update many ClearanceRequests.
     * @example
     * // Update many ClearanceRequests
     * const clearanceRequest = await prisma.clearanceRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClearanceRequests and only return the `id`
     * const clearanceRequestWithIdOnly = await prisma.clearanceRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClearanceRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ClearanceRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClearanceRequest.
     * @param {ClearanceRequestUpsertArgs} args - Arguments to update or create a ClearanceRequest.
     * @example
     * // Update or create a ClearanceRequest
     * const clearanceRequest = await prisma.clearanceRequest.upsert({
     *   create: {
     *     // ... data to create a ClearanceRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClearanceRequest we want to update
     *   }
     * })
     */
    upsert<T extends ClearanceRequestUpsertArgs>(args: SelectSubset<T, ClearanceRequestUpsertArgs<ExtArgs>>): Prisma__ClearanceRequestClient<$Result.GetResult<Prisma.$ClearanceRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClearanceRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceRequestCountArgs} args - Arguments to filter ClearanceRequests to count.
     * @example
     * // Count the number of ClearanceRequests
     * const count = await prisma.clearanceRequest.count({
     *   where: {
     *     // ... the filter for the ClearanceRequests we want to count
     *   }
     * })
    **/
    count<T extends ClearanceRequestCountArgs>(
      args?: Subset<T, ClearanceRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClearanceRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClearanceRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClearanceRequestAggregateArgs>(args: Subset<T, ClearanceRequestAggregateArgs>): Prisma.PrismaPromise<GetClearanceRequestAggregateType<T>>

    /**
     * Group by ClearanceRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClearanceRequestGroupByArgs} args - Group by arguments.
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
      T extends ClearanceRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClearanceRequestGroupByArgs['orderBy'] }
        : { orderBy?: ClearanceRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClearanceRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClearanceRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClearanceRequest model
   */
  readonly fields: ClearanceRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClearanceRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClearanceRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ClearanceRequest model
   */
  interface ClearanceRequestFieldRefs {
    readonly id: FieldRef<"ClearanceRequest", 'String'>
    readonly userId: FieldRef<"ClearanceRequest", 'String'>
    readonly departmentId: FieldRef<"ClearanceRequest", 'String'>
    readonly reason: FieldRef<"ClearanceRequest", 'String'>
    readonly otherReason: FieldRef<"ClearanceRequest", 'String'>
    readonly purpose: FieldRef<"ClearanceRequest", 'String'>
    readonly dateNeeded: FieldRef<"ClearanceRequest", 'DateTime'>
    readonly additionalInfo: FieldRef<"ClearanceRequest", 'String'>
    readonly status: FieldRef<"ClearanceRequest", 'String'>
    readonly documentUrl: FieldRef<"ClearanceRequest", 'String'>
    readonly createdAt: FieldRef<"ClearanceRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ClearanceRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClearanceRequest findUnique
   */
  export type ClearanceRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceRequest to fetch.
     */
    where: ClearanceRequestWhereUniqueInput
  }

  /**
   * ClearanceRequest findUniqueOrThrow
   */
  export type ClearanceRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceRequest to fetch.
     */
    where: ClearanceRequestWhereUniqueInput
  }

  /**
   * ClearanceRequest findFirst
   */
  export type ClearanceRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceRequest to fetch.
     */
    where?: ClearanceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClearanceRequests to fetch.
     */
    orderBy?: ClearanceRequestOrderByWithRelationInput | ClearanceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClearanceRequests.
     */
    cursor?: ClearanceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClearanceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClearanceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClearanceRequests.
     */
    distinct?: ClearanceRequestScalarFieldEnum | ClearanceRequestScalarFieldEnum[]
  }

  /**
   * ClearanceRequest findFirstOrThrow
   */
  export type ClearanceRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceRequest to fetch.
     */
    where?: ClearanceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClearanceRequests to fetch.
     */
    orderBy?: ClearanceRequestOrderByWithRelationInput | ClearanceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClearanceRequests.
     */
    cursor?: ClearanceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClearanceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClearanceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClearanceRequests.
     */
    distinct?: ClearanceRequestScalarFieldEnum | ClearanceRequestScalarFieldEnum[]
  }

  /**
   * ClearanceRequest findMany
   */
  export type ClearanceRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ClearanceRequests to fetch.
     */
    where?: ClearanceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClearanceRequests to fetch.
     */
    orderBy?: ClearanceRequestOrderByWithRelationInput | ClearanceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClearanceRequests.
     */
    cursor?: ClearanceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClearanceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClearanceRequests.
     */
    skip?: number
    distinct?: ClearanceRequestScalarFieldEnum | ClearanceRequestScalarFieldEnum[]
  }

  /**
   * ClearanceRequest create
   */
  export type ClearanceRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ClearanceRequest.
     */
    data: XOR<ClearanceRequestCreateInput, ClearanceRequestUncheckedCreateInput>
  }

  /**
   * ClearanceRequest createMany
   */
  export type ClearanceRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClearanceRequests.
     */
    data: ClearanceRequestCreateManyInput | ClearanceRequestCreateManyInput[]
  }

  /**
   * ClearanceRequest createManyAndReturn
   */
  export type ClearanceRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ClearanceRequests.
     */
    data: ClearanceRequestCreateManyInput | ClearanceRequestCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClearanceRequest update
   */
  export type ClearanceRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ClearanceRequest.
     */
    data: XOR<ClearanceRequestUpdateInput, ClearanceRequestUncheckedUpdateInput>
    /**
     * Choose, which ClearanceRequest to update.
     */
    where: ClearanceRequestWhereUniqueInput
  }

  /**
   * ClearanceRequest updateMany
   */
  export type ClearanceRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClearanceRequests.
     */
    data: XOR<ClearanceRequestUpdateManyMutationInput, ClearanceRequestUncheckedUpdateManyInput>
    /**
     * Filter which ClearanceRequests to update
     */
    where?: ClearanceRequestWhereInput
    /**
     * Limit how many ClearanceRequests to update.
     */
    limit?: number
  }

  /**
   * ClearanceRequest updateManyAndReturn
   */
  export type ClearanceRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * The data used to update ClearanceRequests.
     */
    data: XOR<ClearanceRequestUpdateManyMutationInput, ClearanceRequestUncheckedUpdateManyInput>
    /**
     * Filter which ClearanceRequests to update
     */
    where?: ClearanceRequestWhereInput
    /**
     * Limit how many ClearanceRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClearanceRequest upsert
   */
  export type ClearanceRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ClearanceRequest to update in case it exists.
     */
    where: ClearanceRequestWhereUniqueInput
    /**
     * In case the ClearanceRequest found by the `where` argument doesn't exist, create a new ClearanceRequest with this data.
     */
    create: XOR<ClearanceRequestCreateInput, ClearanceRequestUncheckedCreateInput>
    /**
     * In case the ClearanceRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClearanceRequestUpdateInput, ClearanceRequestUncheckedUpdateInput>
  }

  /**
   * ClearanceRequest delete
   */
  export type ClearanceRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
    /**
     * Filter which ClearanceRequest to delete.
     */
    where: ClearanceRequestWhereUniqueInput
  }

  /**
   * ClearanceRequest deleteMany
   */
  export type ClearanceRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClearanceRequests to delete
     */
    where?: ClearanceRequestWhereInput
    /**
     * Limit how many ClearanceRequests to delete.
     */
    limit?: number
  }

  /**
   * ClearanceRequest without action
   */
  export type ClearanceRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClearanceRequest
     */
    select?: ClearanceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClearanceRequest
     */
    omit?: ClearanceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClearanceRequestInclude<ExtArgs> | null
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


  export const UserHealthFormScalarFieldEnum: {
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
    bloodType: 'bloodType',
    signaturePath: 'signaturePath',
    dateSigned: 'dateSigned',
    pastIllnesses: 'pastIllnesses',
    hospitalization: 'hospitalization',
    medications: 'medications',
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
    medicationPermission: 'medicationPermission'
  };

  export type UserHealthFormScalarFieldEnum = (typeof UserHealthFormScalarFieldEnum)[keyof typeof UserHealthFormScalarFieldEnum]


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


  export const ConsultationDateScalarFieldEnum: {
    id: 'id',
    date: 'date',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConsultationDateScalarFieldEnum = (typeof ConsultationDateScalarFieldEnum)[keyof typeof ConsultationDateScalarFieldEnum]


  export const TimeSlotScalarFieldEnum: {
    id: 'id',
    startTime: 'startTime',
    endTime: 'endTime',
    isAvailable: 'isAvailable',
    consultationDateId: 'consultationDateId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TimeSlotScalarFieldEnum = (typeof TimeSlotScalarFieldEnum)[keyof typeof TimeSlotScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    timeSlotId: 'timeSlotId',
    consultationType: 'consultationType',
    reasonForVisit: 'reasonForVisit',
    additionalNotes: 'additionalNotes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const ClearanceRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    departmentId: 'departmentId',
    reason: 'reason',
    otherReason: 'otherReason',
    purpose: 'purpose',
    dateNeeded: 'dateNeeded',
    additionalInfo: 'additionalInfo',
    status: 'status',
    documentUrl: 'documentUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClearanceRequestScalarFieldEnum = (typeof ClearanceRequestScalarFieldEnum)[keyof typeof ClearanceRequestScalarFieldEnum]


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
    healthForm?: XOR<UserHealthFormNullableScalarRelationFilter, UserHealthFormWhereInput> | null
    uploadedForms?: UploadedFormListRelationFilter
    appointments?: AppointmentListRelationFilter
    clearanceRequests?: ClearanceRequestListRelationFilter
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
    healthForm?: UserHealthFormOrderByWithRelationInput
    uploadedForms?: UploadedFormOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    clearanceRequests?: ClearanceRequestOrderByRelationAggregateInput
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
    healthForm?: XOR<UserHealthFormNullableScalarRelationFilter, UserHealthFormWhereInput> | null
    uploadedForms?: UploadedFormListRelationFilter
    appointments?: AppointmentListRelationFilter
    clearanceRequests?: ClearanceRequestListRelationFilter
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

  export type UserHealthFormWhereInput = {
    AND?: UserHealthFormWhereInput | UserHealthFormWhereInput[]
    OR?: UserHealthFormWhereInput[]
    NOT?: UserHealthFormWhereInput | UserHealthFormWhereInput[]
    id?: StringFilter<"UserHealthForm"> | string
    userId?: StringFilter<"UserHealthForm"> | string
    lastName?: StringFilter<"UserHealthForm"> | string
    firstName?: StringFilter<"UserHealthForm"> | string
    middleInitial?: StringNullableFilter<"UserHealthForm"> | string | null
    birthdate?: DateTimeFilter<"UserHealthForm"> | Date | string
    gender?: StringFilter<"UserHealthForm"> | string
    birthPlace?: StringFilter<"UserHealthForm"> | string
    addressLine1?: StringFilter<"UserHealthForm"> | string
    addressLine2?: StringNullableFilter<"UserHealthForm"> | string | null
    city?: StringFilter<"UserHealthForm"> | string
    state?: StringFilter<"UserHealthForm"> | string
    postalCode?: StringFilter<"UserHealthForm"> | string
    guardianName?: StringNullableFilter<"UserHealthForm"> | string | null
    guardianContact?: StringNullableFilter<"UserHealthForm"> | string | null
    emergencyContact?: StringFilter<"UserHealthForm"> | string
    relationship?: StringFilter<"UserHealthForm"> | string
    emergencyNumber?: StringFilter<"UserHealthForm"> | string
    bloodType?: StringNullableFilter<"UserHealthForm"> | string | null
    signaturePath?: StringFilter<"UserHealthForm"> | string
    dateSigned?: DateTimeFilter<"UserHealthForm"> | Date | string
    pastIllnesses?: StringNullableFilter<"UserHealthForm"> | string | null
    hospitalization?: StringNullableFilter<"UserHealthForm"> | string | null
    medications?: StringNullableFilter<"UserHealthForm"> | string | null
    allergies?: BoolFilter<"UserHealthForm"> | boolean
    immunized?: BoolFilter<"UserHealthForm"> | boolean
    communicableDisease?: BoolFilter<"UserHealthForm"> | boolean
    asthmatic?: BoolFilter<"UserHealthForm"> | boolean
    chronicIllness?: BoolFilter<"UserHealthForm"> | boolean
    hiking?: BoolFilter<"UserHealthForm"> | boolean
    dancing?: BoolFilter<"UserHealthForm"> | boolean
    swimming?: BoolFilter<"UserHealthForm"> | boolean
    basketball?: BoolFilter<"UserHealthForm"> | boolean
    ballgames?: BoolFilter<"UserHealthForm"> | boolean
    jogging?: BoolFilter<"UserHealthForm"> | boolean
    football?: BoolFilter<"UserHealthForm"> | boolean
    badminton?: BoolFilter<"UserHealthForm"> | boolean
    calisthenics?: BoolFilter<"UserHealthForm"> | boolean
    wallclimbing?: BoolFilter<"UserHealthForm"> | boolean
    notFitActivities?: StringNullableFilter<"UserHealthForm"> | string | null
    medicationPermission?: BoolFilter<"UserHealthForm"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserHealthFormOrderByWithRelationInput = {
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
    guardianName?: SortOrderInput | SortOrder
    guardianContact?: SortOrderInput | SortOrder
    emergencyContact?: SortOrder
    relationship?: SortOrder
    emergencyNumber?: SortOrder
    bloodType?: SortOrderInput | SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    pastIllnesses?: SortOrderInput | SortOrder
    hospitalization?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
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
    user?: UserOrderByWithRelationInput
  }

  export type UserHealthFormWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserHealthFormWhereInput | UserHealthFormWhereInput[]
    OR?: UserHealthFormWhereInput[]
    NOT?: UserHealthFormWhereInput | UserHealthFormWhereInput[]
    lastName?: StringFilter<"UserHealthForm"> | string
    firstName?: StringFilter<"UserHealthForm"> | string
    middleInitial?: StringNullableFilter<"UserHealthForm"> | string | null
    birthdate?: DateTimeFilter<"UserHealthForm"> | Date | string
    gender?: StringFilter<"UserHealthForm"> | string
    birthPlace?: StringFilter<"UserHealthForm"> | string
    addressLine1?: StringFilter<"UserHealthForm"> | string
    addressLine2?: StringNullableFilter<"UserHealthForm"> | string | null
    city?: StringFilter<"UserHealthForm"> | string
    state?: StringFilter<"UserHealthForm"> | string
    postalCode?: StringFilter<"UserHealthForm"> | string
    guardianName?: StringNullableFilter<"UserHealthForm"> | string | null
    guardianContact?: StringNullableFilter<"UserHealthForm"> | string | null
    emergencyContact?: StringFilter<"UserHealthForm"> | string
    relationship?: StringFilter<"UserHealthForm"> | string
    emergencyNumber?: StringFilter<"UserHealthForm"> | string
    bloodType?: StringNullableFilter<"UserHealthForm"> | string | null
    signaturePath?: StringFilter<"UserHealthForm"> | string
    dateSigned?: DateTimeFilter<"UserHealthForm"> | Date | string
    pastIllnesses?: StringNullableFilter<"UserHealthForm"> | string | null
    hospitalization?: StringNullableFilter<"UserHealthForm"> | string | null
    medications?: StringNullableFilter<"UserHealthForm"> | string | null
    allergies?: BoolFilter<"UserHealthForm"> | boolean
    immunized?: BoolFilter<"UserHealthForm"> | boolean
    communicableDisease?: BoolFilter<"UserHealthForm"> | boolean
    asthmatic?: BoolFilter<"UserHealthForm"> | boolean
    chronicIllness?: BoolFilter<"UserHealthForm"> | boolean
    hiking?: BoolFilter<"UserHealthForm"> | boolean
    dancing?: BoolFilter<"UserHealthForm"> | boolean
    swimming?: BoolFilter<"UserHealthForm"> | boolean
    basketball?: BoolFilter<"UserHealthForm"> | boolean
    ballgames?: BoolFilter<"UserHealthForm"> | boolean
    jogging?: BoolFilter<"UserHealthForm"> | boolean
    football?: BoolFilter<"UserHealthForm"> | boolean
    badminton?: BoolFilter<"UserHealthForm"> | boolean
    calisthenics?: BoolFilter<"UserHealthForm"> | boolean
    wallclimbing?: BoolFilter<"UserHealthForm"> | boolean
    notFitActivities?: StringNullableFilter<"UserHealthForm"> | string | null
    medicationPermission?: BoolFilter<"UserHealthForm"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserHealthFormOrderByWithAggregationInput = {
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
    guardianName?: SortOrderInput | SortOrder
    guardianContact?: SortOrderInput | SortOrder
    emergencyContact?: SortOrder
    relationship?: SortOrder
    emergencyNumber?: SortOrder
    bloodType?: SortOrderInput | SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    pastIllnesses?: SortOrderInput | SortOrder
    hospitalization?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
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
    _count?: UserHealthFormCountOrderByAggregateInput
    _max?: UserHealthFormMaxOrderByAggregateInput
    _min?: UserHealthFormMinOrderByAggregateInput
  }

  export type UserHealthFormScalarWhereWithAggregatesInput = {
    AND?: UserHealthFormScalarWhereWithAggregatesInput | UserHealthFormScalarWhereWithAggregatesInput[]
    OR?: UserHealthFormScalarWhereWithAggregatesInput[]
    NOT?: UserHealthFormScalarWhereWithAggregatesInput | UserHealthFormScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserHealthForm"> | string
    userId?: StringWithAggregatesFilter<"UserHealthForm"> | string
    lastName?: StringWithAggregatesFilter<"UserHealthForm"> | string
    firstName?: StringWithAggregatesFilter<"UserHealthForm"> | string
    middleInitial?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    birthdate?: DateTimeWithAggregatesFilter<"UserHealthForm"> | Date | string
    gender?: StringWithAggregatesFilter<"UserHealthForm"> | string
    birthPlace?: StringWithAggregatesFilter<"UserHealthForm"> | string
    addressLine1?: StringWithAggregatesFilter<"UserHealthForm"> | string
    addressLine2?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    city?: StringWithAggregatesFilter<"UserHealthForm"> | string
    state?: StringWithAggregatesFilter<"UserHealthForm"> | string
    postalCode?: StringWithAggregatesFilter<"UserHealthForm"> | string
    guardianName?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    guardianContact?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    emergencyContact?: StringWithAggregatesFilter<"UserHealthForm"> | string
    relationship?: StringWithAggregatesFilter<"UserHealthForm"> | string
    emergencyNumber?: StringWithAggregatesFilter<"UserHealthForm"> | string
    bloodType?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    signaturePath?: StringWithAggregatesFilter<"UserHealthForm"> | string
    dateSigned?: DateTimeWithAggregatesFilter<"UserHealthForm"> | Date | string
    pastIllnesses?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    hospitalization?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    medications?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    allergies?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    immunized?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    communicableDisease?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    asthmatic?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    chronicIllness?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    hiking?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    dancing?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    swimming?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    basketball?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    ballgames?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    jogging?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    football?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    badminton?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    calisthenics?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    wallclimbing?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
    notFitActivities?: StringNullableWithAggregatesFilter<"UserHealthForm"> | string | null
    medicationPermission?: BoolWithAggregatesFilter<"UserHealthForm"> | boolean
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

  export type ConsultationDateWhereInput = {
    AND?: ConsultationDateWhereInput | ConsultationDateWhereInput[]
    OR?: ConsultationDateWhereInput[]
    NOT?: ConsultationDateWhereInput | ConsultationDateWhereInput[]
    id?: StringFilter<"ConsultationDate"> | string
    date?: DateTimeFilter<"ConsultationDate"> | Date | string
    isActive?: BoolFilter<"ConsultationDate"> | boolean
    createdAt?: DateTimeFilter<"ConsultationDate"> | Date | string
    updatedAt?: DateTimeFilter<"ConsultationDate"> | Date | string
    timeSlots?: TimeSlotListRelationFilter
  }

  export type ConsultationDateOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    timeSlots?: TimeSlotOrderByRelationAggregateInput
  }

  export type ConsultationDateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsultationDateWhereInput | ConsultationDateWhereInput[]
    OR?: ConsultationDateWhereInput[]
    NOT?: ConsultationDateWhereInput | ConsultationDateWhereInput[]
    date?: DateTimeFilter<"ConsultationDate"> | Date | string
    isActive?: BoolFilter<"ConsultationDate"> | boolean
    createdAt?: DateTimeFilter<"ConsultationDate"> | Date | string
    updatedAt?: DateTimeFilter<"ConsultationDate"> | Date | string
    timeSlots?: TimeSlotListRelationFilter
  }, "id">

  export type ConsultationDateOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConsultationDateCountOrderByAggregateInput
    _max?: ConsultationDateMaxOrderByAggregateInput
    _min?: ConsultationDateMinOrderByAggregateInput
  }

  export type ConsultationDateScalarWhereWithAggregatesInput = {
    AND?: ConsultationDateScalarWhereWithAggregatesInput | ConsultationDateScalarWhereWithAggregatesInput[]
    OR?: ConsultationDateScalarWhereWithAggregatesInput[]
    NOT?: ConsultationDateScalarWhereWithAggregatesInput | ConsultationDateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConsultationDate"> | string
    date?: DateTimeWithAggregatesFilter<"ConsultationDate"> | Date | string
    isActive?: BoolWithAggregatesFilter<"ConsultationDate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ConsultationDate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ConsultationDate"> | Date | string
  }

  export type TimeSlotWhereInput = {
    AND?: TimeSlotWhereInput | TimeSlotWhereInput[]
    OR?: TimeSlotWhereInput[]
    NOT?: TimeSlotWhereInput | TimeSlotWhereInput[]
    id?: StringFilter<"TimeSlot"> | string
    startTime?: StringFilter<"TimeSlot"> | string
    endTime?: StringFilter<"TimeSlot"> | string
    isAvailable?: BoolFilter<"TimeSlot"> | boolean
    consultationDateId?: StringFilter<"TimeSlot"> | string
    createdAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedAt?: DateTimeFilter<"TimeSlot"> | Date | string
    consultationDate?: XOR<ConsultationDateScalarRelationFilter, ConsultationDateWhereInput>
    appointment?: XOR<AppointmentNullableScalarRelationFilter, AppointmentWhereInput> | null
  }

  export type TimeSlotOrderByWithRelationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    consultationDateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    consultationDate?: ConsultationDateOrderByWithRelationInput
    appointment?: AppointmentOrderByWithRelationInput
  }

  export type TimeSlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimeSlotWhereInput | TimeSlotWhereInput[]
    OR?: TimeSlotWhereInput[]
    NOT?: TimeSlotWhereInput | TimeSlotWhereInput[]
    startTime?: StringFilter<"TimeSlot"> | string
    endTime?: StringFilter<"TimeSlot"> | string
    isAvailable?: BoolFilter<"TimeSlot"> | boolean
    consultationDateId?: StringFilter<"TimeSlot"> | string
    createdAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedAt?: DateTimeFilter<"TimeSlot"> | Date | string
    consultationDate?: XOR<ConsultationDateScalarRelationFilter, ConsultationDateWhereInput>
    appointment?: XOR<AppointmentNullableScalarRelationFilter, AppointmentWhereInput> | null
  }, "id">

  export type TimeSlotOrderByWithAggregationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    consultationDateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TimeSlotCountOrderByAggregateInput
    _max?: TimeSlotMaxOrderByAggregateInput
    _min?: TimeSlotMinOrderByAggregateInput
  }

  export type TimeSlotScalarWhereWithAggregatesInput = {
    AND?: TimeSlotScalarWhereWithAggregatesInput | TimeSlotScalarWhereWithAggregatesInput[]
    OR?: TimeSlotScalarWhereWithAggregatesInput[]
    NOT?: TimeSlotScalarWhereWithAggregatesInput | TimeSlotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TimeSlot"> | string
    startTime?: StringWithAggregatesFilter<"TimeSlot"> | string
    endTime?: StringWithAggregatesFilter<"TimeSlot"> | string
    isAvailable?: BoolWithAggregatesFilter<"TimeSlot"> | boolean
    consultationDateId?: StringWithAggregatesFilter<"TimeSlot"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TimeSlot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TimeSlot"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    userId?: StringFilter<"Appointment"> | string
    timeSlotId?: StringFilter<"Appointment"> | string
    consultationType?: StringFilter<"Appointment"> | string
    reasonForVisit?: StringFilter<"Appointment"> | string
    additionalNotes?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    timeSlot?: XOR<TimeSlotScalarRelationFilter, TimeSlotWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    timeSlotId?: SortOrder
    consultationType?: SortOrder
    reasonForVisit?: SortOrder
    additionalNotes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    timeSlot?: TimeSlotOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    timeSlotId?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    userId?: StringFilter<"Appointment"> | string
    consultationType?: StringFilter<"Appointment"> | string
    reasonForVisit?: StringFilter<"Appointment"> | string
    additionalNotes?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    timeSlot?: XOR<TimeSlotScalarRelationFilter, TimeSlotWhereInput>
  }, "id" | "timeSlotId">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    timeSlotId?: SortOrder
    consultationType?: SortOrder
    reasonForVisit?: SortOrder
    additionalNotes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    userId?: StringWithAggregatesFilter<"Appointment"> | string
    timeSlotId?: StringWithAggregatesFilter<"Appointment"> | string
    consultationType?: StringWithAggregatesFilter<"Appointment"> | string
    reasonForVisit?: StringWithAggregatesFilter<"Appointment"> | string
    additionalNotes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    status?: StringWithAggregatesFilter<"Appointment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    isActive?: BoolFilter<"Department"> | boolean
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
    clearanceRequests?: ClearanceRequestListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clearanceRequests?: ClearanceRequestOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    name?: StringFilter<"Department"> | string
    isActive?: BoolFilter<"Department"> | boolean
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
    clearanceRequests?: ClearanceRequestListRelationFilter
  }, "id">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Department"> | string
    name?: StringWithAggregatesFilter<"Department"> | string
    isActive?: BoolWithAggregatesFilter<"Department"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
  }

  export type ClearanceRequestWhereInput = {
    AND?: ClearanceRequestWhereInput | ClearanceRequestWhereInput[]
    OR?: ClearanceRequestWhereInput[]
    NOT?: ClearanceRequestWhereInput | ClearanceRequestWhereInput[]
    id?: StringFilter<"ClearanceRequest"> | string
    userId?: StringFilter<"ClearanceRequest"> | string
    departmentId?: StringFilter<"ClearanceRequest"> | string
    reason?: StringFilter<"ClearanceRequest"> | string
    otherReason?: StringNullableFilter<"ClearanceRequest"> | string | null
    purpose?: StringFilter<"ClearanceRequest"> | string
    dateNeeded?: DateTimeFilter<"ClearanceRequest"> | Date | string
    additionalInfo?: StringNullableFilter<"ClearanceRequest"> | string | null
    status?: StringFilter<"ClearanceRequest"> | string
    documentUrl?: StringNullableFilter<"ClearanceRequest"> | string | null
    createdAt?: DateTimeFilter<"ClearanceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ClearanceRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
  }

  export type ClearanceRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrder
    reason?: SortOrder
    otherReason?: SortOrderInput | SortOrder
    purpose?: SortOrder
    dateNeeded?: SortOrder
    additionalInfo?: SortOrderInput | SortOrder
    status?: SortOrder
    documentUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    department?: DepartmentOrderByWithRelationInput
  }

  export type ClearanceRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClearanceRequestWhereInput | ClearanceRequestWhereInput[]
    OR?: ClearanceRequestWhereInput[]
    NOT?: ClearanceRequestWhereInput | ClearanceRequestWhereInput[]
    userId?: StringFilter<"ClearanceRequest"> | string
    departmentId?: StringFilter<"ClearanceRequest"> | string
    reason?: StringFilter<"ClearanceRequest"> | string
    otherReason?: StringNullableFilter<"ClearanceRequest"> | string | null
    purpose?: StringFilter<"ClearanceRequest"> | string
    dateNeeded?: DateTimeFilter<"ClearanceRequest"> | Date | string
    additionalInfo?: StringNullableFilter<"ClearanceRequest"> | string | null
    status?: StringFilter<"ClearanceRequest"> | string
    documentUrl?: StringNullableFilter<"ClearanceRequest"> | string | null
    createdAt?: DateTimeFilter<"ClearanceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ClearanceRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
  }, "id">

  export type ClearanceRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrder
    reason?: SortOrder
    otherReason?: SortOrderInput | SortOrder
    purpose?: SortOrder
    dateNeeded?: SortOrder
    additionalInfo?: SortOrderInput | SortOrder
    status?: SortOrder
    documentUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClearanceRequestCountOrderByAggregateInput
    _max?: ClearanceRequestMaxOrderByAggregateInput
    _min?: ClearanceRequestMinOrderByAggregateInput
  }

  export type ClearanceRequestScalarWhereWithAggregatesInput = {
    AND?: ClearanceRequestScalarWhereWithAggregatesInput | ClearanceRequestScalarWhereWithAggregatesInput[]
    OR?: ClearanceRequestScalarWhereWithAggregatesInput[]
    NOT?: ClearanceRequestScalarWhereWithAggregatesInput | ClearanceRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClearanceRequest"> | string
    userId?: StringWithAggregatesFilter<"ClearanceRequest"> | string
    departmentId?: StringWithAggregatesFilter<"ClearanceRequest"> | string
    reason?: StringWithAggregatesFilter<"ClearanceRequest"> | string
    otherReason?: StringNullableWithAggregatesFilter<"ClearanceRequest"> | string | null
    purpose?: StringWithAggregatesFilter<"ClearanceRequest"> | string
    dateNeeded?: DateTimeWithAggregatesFilter<"ClearanceRequest"> | Date | string
    additionalInfo?: StringNullableWithAggregatesFilter<"ClearanceRequest"> | string | null
    status?: StringWithAggregatesFilter<"ClearanceRequest"> | string
    documentUrl?: StringNullableWithAggregatesFilter<"ClearanceRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ClearanceRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClearanceRequest"> | Date | string
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
    healthForm?: UserHealthFormCreateNestedOneWithoutUserInput
    uploadedForms?: UploadedFormCreateNestedManyWithoutUserInput
    appointments?: AppointmentCreateNestedManyWithoutUserInput
    clearanceRequests?: ClearanceRequestCreateNestedManyWithoutUserInput
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
    healthForm?: UserHealthFormUncheckedCreateNestedOneWithoutUserInput
    uploadedForms?: UploadedFormUncheckedCreateNestedManyWithoutUserInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutUserInput
    clearanceRequests?: ClearanceRequestUncheckedCreateNestedManyWithoutUserInput
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
    healthForm?: UserHealthFormUpdateOneWithoutUserNestedInput
    uploadedForms?: UploadedFormUpdateManyWithoutUserNestedInput
    appointments?: AppointmentUpdateManyWithoutUserNestedInput
    clearanceRequests?: ClearanceRequestUpdateManyWithoutUserNestedInput
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
    healthForm?: UserHealthFormUncheckedUpdateOneWithoutUserNestedInput
    uploadedForms?: UploadedFormUncheckedUpdateManyWithoutUserNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutUserNestedInput
    clearanceRequests?: ClearanceRequestUncheckedUpdateManyWithoutUserNestedInput
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

  export type UserHealthFormCreateInput = {
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
    guardianName?: string | null
    guardianContact?: string | null
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    bloodType?: string | null
    signaturePath: string
    dateSigned?: Date | string
    pastIllnesses?: string | null
    hospitalization?: string | null
    medications?: string | null
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
    user: UserCreateNestedOneWithoutHealthFormInput
  }

  export type UserHealthFormUncheckedCreateInput = {
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
    guardianName?: string | null
    guardianContact?: string | null
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    bloodType?: string | null
    signaturePath: string
    dateSigned?: Date | string
    pastIllnesses?: string | null
    hospitalization?: string | null
    medications?: string | null
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
  }

  export type UserHealthFormUpdateInput = {
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
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianContact?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
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
    user?: UserUpdateOneRequiredWithoutHealthFormNestedInput
  }

  export type UserHealthFormUncheckedUpdateInput = {
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
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianContact?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
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
  }

  export type UserHealthFormCreateManyInput = {
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
    guardianName?: string | null
    guardianContact?: string | null
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    bloodType?: string | null
    signaturePath: string
    dateSigned?: Date | string
    pastIllnesses?: string | null
    hospitalization?: string | null
    medications?: string | null
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
  }

  export type UserHealthFormUpdateManyMutationInput = {
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
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianContact?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
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
  }

  export type UserHealthFormUncheckedUpdateManyInput = {
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
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianContact?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type ConsultationDateCreateInput = {
    id?: string
    date: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    timeSlots?: TimeSlotCreateNestedManyWithoutConsultationDateInput
  }

  export type ConsultationDateUncheckedCreateInput = {
    id?: string
    date: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    timeSlots?: TimeSlotUncheckedCreateNestedManyWithoutConsultationDateInput
  }

  export type ConsultationDateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlots?: TimeSlotUpdateManyWithoutConsultationDateNestedInput
  }

  export type ConsultationDateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlots?: TimeSlotUncheckedUpdateManyWithoutConsultationDateNestedInput
  }

  export type ConsultationDateCreateManyInput = {
    id?: string
    date: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationDateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationDateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeSlotCreateInput = {
    id?: string
    startTime: string
    endTime: string
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    consultationDate: ConsultationDateCreateNestedOneWithoutTimeSlotsInput
    appointment?: AppointmentCreateNestedOneWithoutTimeSlotInput
  }

  export type TimeSlotUncheckedCreateInput = {
    id?: string
    startTime: string
    endTime: string
    isAvailable?: boolean
    consultationDateId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentUncheckedCreateNestedOneWithoutTimeSlotInput
  }

  export type TimeSlotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationDate?: ConsultationDateUpdateOneRequiredWithoutTimeSlotsNestedInput
    appointment?: AppointmentUpdateOneWithoutTimeSlotNestedInput
  }

  export type TimeSlotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    consultationDateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUncheckedUpdateOneWithoutTimeSlotNestedInput
  }

  export type TimeSlotCreateManyInput = {
    id?: string
    startTime: string
    endTime: string
    isAvailable?: boolean
    consultationDateId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeSlotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeSlotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    consultationDateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    consultationType: string
    reasonForVisit: string
    additionalNotes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAppointmentsInput
    timeSlot: TimeSlotCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    userId: string
    timeSlotId: string
    consultationType: string
    reasonForVisit: string
    additionalNotes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
    timeSlot?: TimeSlotUpdateOneRequiredWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timeSlotId?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    userId: string
    timeSlotId: string
    consultationType: string
    reasonForVisit: string
    additionalNotes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timeSlotId?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentCreateInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clearanceRequests?: ClearanceRequestCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clearanceRequests?: ClearanceRequestUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clearanceRequests?: ClearanceRequestUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clearanceRequests?: ClearanceRequestUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceRequestCreateInput = {
    id?: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutClearanceRequestsInput
    department: DepartmentCreateNestedOneWithoutClearanceRequestsInput
  }

  export type ClearanceRequestUncheckedCreateInput = {
    id?: string
    userId: string
    departmentId: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClearanceRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClearanceRequestsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutClearanceRequestsNestedInput
  }

  export type ClearanceRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceRequestCreateManyInput = {
    id?: string
    userId: string
    departmentId: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClearanceRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type UserHealthFormNullableScalarRelationFilter = {
    is?: UserHealthFormWhereInput | null
    isNot?: UserHealthFormWhereInput | null
  }

  export type UploadedFormListRelationFilter = {
    every?: UploadedFormWhereInput
    some?: UploadedFormWhereInput
    none?: UploadedFormWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type ClearanceRequestListRelationFilter = {
    every?: ClearanceRequestWhereInput
    some?: ClearanceRequestWhereInput
    none?: ClearanceRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UploadedFormOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClearanceRequestOrderByRelationAggregateInput = {
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

  export type UserHealthFormCountOrderByAggregateInput = {
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
    bloodType?: SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    pastIllnesses?: SortOrder
    hospitalization?: SortOrder
    medications?: SortOrder
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
  }

  export type UserHealthFormMaxOrderByAggregateInput = {
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
    bloodType?: SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    pastIllnesses?: SortOrder
    hospitalization?: SortOrder
    medications?: SortOrder
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
  }

  export type UserHealthFormMinOrderByAggregateInput = {
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
    bloodType?: SortOrder
    signaturePath?: SortOrder
    dateSigned?: SortOrder
    pastIllnesses?: SortOrder
    hospitalization?: SortOrder
    medications?: SortOrder
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

  export type TimeSlotListRelationFilter = {
    every?: TimeSlotWhereInput
    some?: TimeSlotWhereInput
    none?: TimeSlotWhereInput
  }

  export type TimeSlotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsultationDateCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConsultationDateMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConsultationDateMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConsultationDateScalarRelationFilter = {
    is?: ConsultationDateWhereInput
    isNot?: ConsultationDateWhereInput
  }

  export type AppointmentNullableScalarRelationFilter = {
    is?: AppointmentWhereInput | null
    isNot?: AppointmentWhereInput | null
  }

  export type TimeSlotCountOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    consultationDateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeSlotMaxOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    consultationDateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeSlotMinOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isAvailable?: SortOrder
    consultationDateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeSlotScalarRelationFilter = {
    is?: TimeSlotWhereInput
    isNot?: TimeSlotWhereInput
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeSlotId?: SortOrder
    consultationType?: SortOrder
    reasonForVisit?: SortOrder
    additionalNotes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeSlotId?: SortOrder
    consultationType?: SortOrder
    reasonForVisit?: SortOrder
    additionalNotes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeSlotId?: SortOrder
    consultationType?: SortOrder
    reasonForVisit?: SortOrder
    additionalNotes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentScalarRelationFilter = {
    is?: DepartmentWhereInput
    isNot?: DepartmentWhereInput
  }

  export type ClearanceRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrder
    reason?: SortOrder
    otherReason?: SortOrder
    purpose?: SortOrder
    dateNeeded?: SortOrder
    additionalInfo?: SortOrder
    status?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClearanceRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrder
    reason?: SortOrder
    otherReason?: SortOrder
    purpose?: SortOrder
    dateNeeded?: SortOrder
    additionalInfo?: SortOrder
    status?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClearanceRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrder
    reason?: SortOrder
    otherReason?: SortOrder
    purpose?: SortOrder
    dateNeeded?: SortOrder
    additionalInfo?: SortOrder
    status?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserHealthFormCreateNestedOneWithoutUserInput = {
    create?: XOR<UserHealthFormCreateWithoutUserInput, UserHealthFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserHealthFormCreateOrConnectWithoutUserInput
    connect?: UserHealthFormWhereUniqueInput
  }

  export type UploadedFormCreateNestedManyWithoutUserInput = {
    create?: XOR<UploadedFormCreateWithoutUserInput, UploadedFormUncheckedCreateWithoutUserInput> | UploadedFormCreateWithoutUserInput[] | UploadedFormUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadedFormCreateOrConnectWithoutUserInput | UploadedFormCreateOrConnectWithoutUserInput[]
    createMany?: UploadedFormCreateManyUserInputEnvelope
    connect?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutUserInput = {
    create?: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput> | AppointmentCreateWithoutUserInput[] | AppointmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutUserInput | AppointmentCreateOrConnectWithoutUserInput[]
    createMany?: AppointmentCreateManyUserInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ClearanceRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<ClearanceRequestCreateWithoutUserInput, ClearanceRequestUncheckedCreateWithoutUserInput> | ClearanceRequestCreateWithoutUserInput[] | ClearanceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClearanceRequestCreateOrConnectWithoutUserInput | ClearanceRequestCreateOrConnectWithoutUserInput[]
    createMany?: ClearanceRequestCreateManyUserInputEnvelope
    connect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
  }

  export type UserHealthFormUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserHealthFormCreateWithoutUserInput, UserHealthFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserHealthFormCreateOrConnectWithoutUserInput
    connect?: UserHealthFormWhereUniqueInput
  }

  export type UploadedFormUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UploadedFormCreateWithoutUserInput, UploadedFormUncheckedCreateWithoutUserInput> | UploadedFormCreateWithoutUserInput[] | UploadedFormUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadedFormCreateOrConnectWithoutUserInput | UploadedFormCreateOrConnectWithoutUserInput[]
    createMany?: UploadedFormCreateManyUserInputEnvelope
    connect?: UploadedFormWhereUniqueInput | UploadedFormWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput> | AppointmentCreateWithoutUserInput[] | AppointmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutUserInput | AppointmentCreateOrConnectWithoutUserInput[]
    createMany?: AppointmentCreateManyUserInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type ClearanceRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ClearanceRequestCreateWithoutUserInput, ClearanceRequestUncheckedCreateWithoutUserInput> | ClearanceRequestCreateWithoutUserInput[] | ClearanceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClearanceRequestCreateOrConnectWithoutUserInput | ClearanceRequestCreateOrConnectWithoutUserInput[]
    createMany?: ClearanceRequestCreateManyUserInputEnvelope
    connect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
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

  export type UserHealthFormUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserHealthFormCreateWithoutUserInput, UserHealthFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserHealthFormCreateOrConnectWithoutUserInput
    upsert?: UserHealthFormUpsertWithoutUserInput
    disconnect?: UserHealthFormWhereInput | boolean
    delete?: UserHealthFormWhereInput | boolean
    connect?: UserHealthFormWhereUniqueInput
    update?: XOR<XOR<UserHealthFormUpdateToOneWithWhereWithoutUserInput, UserHealthFormUpdateWithoutUserInput>, UserHealthFormUncheckedUpdateWithoutUserInput>
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

  export type AppointmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput> | AppointmentCreateWithoutUserInput[] | AppointmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutUserInput | AppointmentCreateOrConnectWithoutUserInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutUserInput | AppointmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppointmentCreateManyUserInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutUserInput | AppointmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutUserInput | AppointmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ClearanceRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClearanceRequestCreateWithoutUserInput, ClearanceRequestUncheckedCreateWithoutUserInput> | ClearanceRequestCreateWithoutUserInput[] | ClearanceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClearanceRequestCreateOrConnectWithoutUserInput | ClearanceRequestCreateOrConnectWithoutUserInput[]
    upsert?: ClearanceRequestUpsertWithWhereUniqueWithoutUserInput | ClearanceRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClearanceRequestCreateManyUserInputEnvelope
    set?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    disconnect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    delete?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    connect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    update?: ClearanceRequestUpdateWithWhereUniqueWithoutUserInput | ClearanceRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClearanceRequestUpdateManyWithWhereWithoutUserInput | ClearanceRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClearanceRequestScalarWhereInput | ClearanceRequestScalarWhereInput[]
  }

  export type UserHealthFormUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserHealthFormCreateWithoutUserInput, UserHealthFormUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserHealthFormCreateOrConnectWithoutUserInput
    upsert?: UserHealthFormUpsertWithoutUserInput
    disconnect?: UserHealthFormWhereInput | boolean
    delete?: UserHealthFormWhereInput | boolean
    connect?: UserHealthFormWhereUniqueInput
    update?: XOR<XOR<UserHealthFormUpdateToOneWithWhereWithoutUserInput, UserHealthFormUpdateWithoutUserInput>, UserHealthFormUncheckedUpdateWithoutUserInput>
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

  export type AppointmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput> | AppointmentCreateWithoutUserInput[] | AppointmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutUserInput | AppointmentCreateOrConnectWithoutUserInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutUserInput | AppointmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AppointmentCreateManyUserInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutUserInput | AppointmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutUserInput | AppointmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ClearanceRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClearanceRequestCreateWithoutUserInput, ClearanceRequestUncheckedCreateWithoutUserInput> | ClearanceRequestCreateWithoutUserInput[] | ClearanceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClearanceRequestCreateOrConnectWithoutUserInput | ClearanceRequestCreateOrConnectWithoutUserInput[]
    upsert?: ClearanceRequestUpsertWithWhereUniqueWithoutUserInput | ClearanceRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClearanceRequestCreateManyUserInputEnvelope
    set?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    disconnect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    delete?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    connect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    update?: ClearanceRequestUpdateWithWhereUniqueWithoutUserInput | ClearanceRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClearanceRequestUpdateManyWithWhereWithoutUserInput | ClearanceRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClearanceRequestScalarWhereInput | ClearanceRequestScalarWhereInput[]
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

  export type TimeSlotCreateNestedManyWithoutConsultationDateInput = {
    create?: XOR<TimeSlotCreateWithoutConsultationDateInput, TimeSlotUncheckedCreateWithoutConsultationDateInput> | TimeSlotCreateWithoutConsultationDateInput[] | TimeSlotUncheckedCreateWithoutConsultationDateInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutConsultationDateInput | TimeSlotCreateOrConnectWithoutConsultationDateInput[]
    createMany?: TimeSlotCreateManyConsultationDateInputEnvelope
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
  }

  export type TimeSlotUncheckedCreateNestedManyWithoutConsultationDateInput = {
    create?: XOR<TimeSlotCreateWithoutConsultationDateInput, TimeSlotUncheckedCreateWithoutConsultationDateInput> | TimeSlotCreateWithoutConsultationDateInput[] | TimeSlotUncheckedCreateWithoutConsultationDateInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutConsultationDateInput | TimeSlotCreateOrConnectWithoutConsultationDateInput[]
    createMany?: TimeSlotCreateManyConsultationDateInputEnvelope
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
  }

  export type TimeSlotUpdateManyWithoutConsultationDateNestedInput = {
    create?: XOR<TimeSlotCreateWithoutConsultationDateInput, TimeSlotUncheckedCreateWithoutConsultationDateInput> | TimeSlotCreateWithoutConsultationDateInput[] | TimeSlotUncheckedCreateWithoutConsultationDateInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutConsultationDateInput | TimeSlotCreateOrConnectWithoutConsultationDateInput[]
    upsert?: TimeSlotUpsertWithWhereUniqueWithoutConsultationDateInput | TimeSlotUpsertWithWhereUniqueWithoutConsultationDateInput[]
    createMany?: TimeSlotCreateManyConsultationDateInputEnvelope
    set?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    disconnect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    delete?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    update?: TimeSlotUpdateWithWhereUniqueWithoutConsultationDateInput | TimeSlotUpdateWithWhereUniqueWithoutConsultationDateInput[]
    updateMany?: TimeSlotUpdateManyWithWhereWithoutConsultationDateInput | TimeSlotUpdateManyWithWhereWithoutConsultationDateInput[]
    deleteMany?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
  }

  export type TimeSlotUncheckedUpdateManyWithoutConsultationDateNestedInput = {
    create?: XOR<TimeSlotCreateWithoutConsultationDateInput, TimeSlotUncheckedCreateWithoutConsultationDateInput> | TimeSlotCreateWithoutConsultationDateInput[] | TimeSlotUncheckedCreateWithoutConsultationDateInput[]
    connectOrCreate?: TimeSlotCreateOrConnectWithoutConsultationDateInput | TimeSlotCreateOrConnectWithoutConsultationDateInput[]
    upsert?: TimeSlotUpsertWithWhereUniqueWithoutConsultationDateInput | TimeSlotUpsertWithWhereUniqueWithoutConsultationDateInput[]
    createMany?: TimeSlotCreateManyConsultationDateInputEnvelope
    set?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    disconnect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    delete?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    connect?: TimeSlotWhereUniqueInput | TimeSlotWhereUniqueInput[]
    update?: TimeSlotUpdateWithWhereUniqueWithoutConsultationDateInput | TimeSlotUpdateWithWhereUniqueWithoutConsultationDateInput[]
    updateMany?: TimeSlotUpdateManyWithWhereWithoutConsultationDateInput | TimeSlotUpdateManyWithWhereWithoutConsultationDateInput[]
    deleteMany?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
  }

  export type ConsultationDateCreateNestedOneWithoutTimeSlotsInput = {
    create?: XOR<ConsultationDateCreateWithoutTimeSlotsInput, ConsultationDateUncheckedCreateWithoutTimeSlotsInput>
    connectOrCreate?: ConsultationDateCreateOrConnectWithoutTimeSlotsInput
    connect?: ConsultationDateWhereUniqueInput
  }

  export type AppointmentCreateNestedOneWithoutTimeSlotInput = {
    create?: XOR<AppointmentCreateWithoutTimeSlotInput, AppointmentUncheckedCreateWithoutTimeSlotInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutTimeSlotInput
    connect?: AppointmentWhereUniqueInput
  }

  export type AppointmentUncheckedCreateNestedOneWithoutTimeSlotInput = {
    create?: XOR<AppointmentCreateWithoutTimeSlotInput, AppointmentUncheckedCreateWithoutTimeSlotInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutTimeSlotInput
    connect?: AppointmentWhereUniqueInput
  }

  export type ConsultationDateUpdateOneRequiredWithoutTimeSlotsNestedInput = {
    create?: XOR<ConsultationDateCreateWithoutTimeSlotsInput, ConsultationDateUncheckedCreateWithoutTimeSlotsInput>
    connectOrCreate?: ConsultationDateCreateOrConnectWithoutTimeSlotsInput
    upsert?: ConsultationDateUpsertWithoutTimeSlotsInput
    connect?: ConsultationDateWhereUniqueInput
    update?: XOR<XOR<ConsultationDateUpdateToOneWithWhereWithoutTimeSlotsInput, ConsultationDateUpdateWithoutTimeSlotsInput>, ConsultationDateUncheckedUpdateWithoutTimeSlotsInput>
  }

  export type AppointmentUpdateOneWithoutTimeSlotNestedInput = {
    create?: XOR<AppointmentCreateWithoutTimeSlotInput, AppointmentUncheckedCreateWithoutTimeSlotInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutTimeSlotInput
    upsert?: AppointmentUpsertWithoutTimeSlotInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutTimeSlotInput, AppointmentUpdateWithoutTimeSlotInput>, AppointmentUncheckedUpdateWithoutTimeSlotInput>
  }

  export type AppointmentUncheckedUpdateOneWithoutTimeSlotNestedInput = {
    create?: XOR<AppointmentCreateWithoutTimeSlotInput, AppointmentUncheckedCreateWithoutTimeSlotInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutTimeSlotInput
    upsert?: AppointmentUpsertWithoutTimeSlotInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutTimeSlotInput, AppointmentUpdateWithoutTimeSlotInput>, AppointmentUncheckedUpdateWithoutTimeSlotInput>
  }

  export type UserCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type TimeSlotCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<TimeSlotCreateWithoutAppointmentInput, TimeSlotUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: TimeSlotCreateOrConnectWithoutAppointmentInput
    connect?: TimeSlotWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAppointmentsInput
    upsert?: UserUpsertWithoutAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAppointmentsInput, UserUpdateWithoutAppointmentsInput>, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type TimeSlotUpdateOneRequiredWithoutAppointmentNestedInput = {
    create?: XOR<TimeSlotCreateWithoutAppointmentInput, TimeSlotUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: TimeSlotCreateOrConnectWithoutAppointmentInput
    upsert?: TimeSlotUpsertWithoutAppointmentInput
    connect?: TimeSlotWhereUniqueInput
    update?: XOR<XOR<TimeSlotUpdateToOneWithWhereWithoutAppointmentInput, TimeSlotUpdateWithoutAppointmentInput>, TimeSlotUncheckedUpdateWithoutAppointmentInput>
  }

  export type ClearanceRequestCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<ClearanceRequestCreateWithoutDepartmentInput, ClearanceRequestUncheckedCreateWithoutDepartmentInput> | ClearanceRequestCreateWithoutDepartmentInput[] | ClearanceRequestUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: ClearanceRequestCreateOrConnectWithoutDepartmentInput | ClearanceRequestCreateOrConnectWithoutDepartmentInput[]
    createMany?: ClearanceRequestCreateManyDepartmentInputEnvelope
    connect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
  }

  export type ClearanceRequestUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<ClearanceRequestCreateWithoutDepartmentInput, ClearanceRequestUncheckedCreateWithoutDepartmentInput> | ClearanceRequestCreateWithoutDepartmentInput[] | ClearanceRequestUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: ClearanceRequestCreateOrConnectWithoutDepartmentInput | ClearanceRequestCreateOrConnectWithoutDepartmentInput[]
    createMany?: ClearanceRequestCreateManyDepartmentInputEnvelope
    connect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
  }

  export type ClearanceRequestUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<ClearanceRequestCreateWithoutDepartmentInput, ClearanceRequestUncheckedCreateWithoutDepartmentInput> | ClearanceRequestCreateWithoutDepartmentInput[] | ClearanceRequestUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: ClearanceRequestCreateOrConnectWithoutDepartmentInput | ClearanceRequestCreateOrConnectWithoutDepartmentInput[]
    upsert?: ClearanceRequestUpsertWithWhereUniqueWithoutDepartmentInput | ClearanceRequestUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: ClearanceRequestCreateManyDepartmentInputEnvelope
    set?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    disconnect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    delete?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    connect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    update?: ClearanceRequestUpdateWithWhereUniqueWithoutDepartmentInput | ClearanceRequestUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: ClearanceRequestUpdateManyWithWhereWithoutDepartmentInput | ClearanceRequestUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: ClearanceRequestScalarWhereInput | ClearanceRequestScalarWhereInput[]
  }

  export type ClearanceRequestUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<ClearanceRequestCreateWithoutDepartmentInput, ClearanceRequestUncheckedCreateWithoutDepartmentInput> | ClearanceRequestCreateWithoutDepartmentInput[] | ClearanceRequestUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: ClearanceRequestCreateOrConnectWithoutDepartmentInput | ClearanceRequestCreateOrConnectWithoutDepartmentInput[]
    upsert?: ClearanceRequestUpsertWithWhereUniqueWithoutDepartmentInput | ClearanceRequestUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: ClearanceRequestCreateManyDepartmentInputEnvelope
    set?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    disconnect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    delete?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    connect?: ClearanceRequestWhereUniqueInput | ClearanceRequestWhereUniqueInput[]
    update?: ClearanceRequestUpdateWithWhereUniqueWithoutDepartmentInput | ClearanceRequestUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: ClearanceRequestUpdateManyWithWhereWithoutDepartmentInput | ClearanceRequestUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: ClearanceRequestScalarWhereInput | ClearanceRequestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutClearanceRequestsInput = {
    create?: XOR<UserCreateWithoutClearanceRequestsInput, UserUncheckedCreateWithoutClearanceRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClearanceRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type DepartmentCreateNestedOneWithoutClearanceRequestsInput = {
    create?: XOR<DepartmentCreateWithoutClearanceRequestsInput, DepartmentUncheckedCreateWithoutClearanceRequestsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutClearanceRequestsInput
    connect?: DepartmentWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutClearanceRequestsNestedInput = {
    create?: XOR<UserCreateWithoutClearanceRequestsInput, UserUncheckedCreateWithoutClearanceRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClearanceRequestsInput
    upsert?: UserUpsertWithoutClearanceRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClearanceRequestsInput, UserUpdateWithoutClearanceRequestsInput>, UserUncheckedUpdateWithoutClearanceRequestsInput>
  }

  export type DepartmentUpdateOneRequiredWithoutClearanceRequestsNestedInput = {
    create?: XOR<DepartmentCreateWithoutClearanceRequestsInput, DepartmentUncheckedCreateWithoutClearanceRequestsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutClearanceRequestsInput
    upsert?: DepartmentUpsertWithoutClearanceRequestsInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutClearanceRequestsInput, DepartmentUpdateWithoutClearanceRequestsInput>, DepartmentUncheckedUpdateWithoutClearanceRequestsInput>
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

  export type UserHealthFormCreateWithoutUserInput = {
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
    guardianName?: string | null
    guardianContact?: string | null
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    bloodType?: string | null
    signaturePath: string
    dateSigned?: Date | string
    pastIllnesses?: string | null
    hospitalization?: string | null
    medications?: string | null
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
  }

  export type UserHealthFormUncheckedCreateWithoutUserInput = {
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
    guardianName?: string | null
    guardianContact?: string | null
    emergencyContact: string
    relationship: string
    emergencyNumber: string
    bloodType?: string | null
    signaturePath: string
    dateSigned?: Date | string
    pastIllnesses?: string | null
    hospitalization?: string | null
    medications?: string | null
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
  }

  export type UserHealthFormCreateOrConnectWithoutUserInput = {
    where: UserHealthFormWhereUniqueInput
    create: XOR<UserHealthFormCreateWithoutUserInput, UserHealthFormUncheckedCreateWithoutUserInput>
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

  export type AppointmentCreateWithoutUserInput = {
    id?: string
    consultationType: string
    reasonForVisit: string
    additionalNotes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    timeSlot: TimeSlotCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutUserInput = {
    id?: string
    timeSlotId: string
    consultationType: string
    reasonForVisit: string
    additionalNotes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutUserInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput>
  }

  export type AppointmentCreateManyUserInputEnvelope = {
    data: AppointmentCreateManyUserInput | AppointmentCreateManyUserInput[]
  }

  export type ClearanceRequestCreateWithoutUserInput = {
    id?: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    department: DepartmentCreateNestedOneWithoutClearanceRequestsInput
  }

  export type ClearanceRequestUncheckedCreateWithoutUserInput = {
    id?: string
    departmentId: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClearanceRequestCreateOrConnectWithoutUserInput = {
    where: ClearanceRequestWhereUniqueInput
    create: XOR<ClearanceRequestCreateWithoutUserInput, ClearanceRequestUncheckedCreateWithoutUserInput>
  }

  export type ClearanceRequestCreateManyUserInputEnvelope = {
    data: ClearanceRequestCreateManyUserInput | ClearanceRequestCreateManyUserInput[]
  }

  export type UserHealthFormUpsertWithoutUserInput = {
    update: XOR<UserHealthFormUpdateWithoutUserInput, UserHealthFormUncheckedUpdateWithoutUserInput>
    create: XOR<UserHealthFormCreateWithoutUserInput, UserHealthFormUncheckedCreateWithoutUserInput>
    where?: UserHealthFormWhereInput
  }

  export type UserHealthFormUpdateToOneWithWhereWithoutUserInput = {
    where?: UserHealthFormWhereInput
    data: XOR<UserHealthFormUpdateWithoutUserInput, UserHealthFormUncheckedUpdateWithoutUserInput>
  }

  export type UserHealthFormUpdateWithoutUserInput = {
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
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianContact?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
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
  }

  export type UserHealthFormUncheckedUpdateWithoutUserInput = {
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
    guardianName?: NullableStringFieldUpdateOperationsInput | string | null
    guardianContact?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: StringFieldUpdateOperationsInput | string
    relationship?: StringFieldUpdateOperationsInput | string
    emergencyNumber?: StringFieldUpdateOperationsInput | string
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    signaturePath?: StringFieldUpdateOperationsInput | string
    dateSigned?: DateTimeFieldUpdateOperationsInput | Date | string
    pastIllnesses?: NullableStringFieldUpdateOperationsInput | string | null
    hospitalization?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type AppointmentUpsertWithWhereUniqueWithoutUserInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutUserInput, AppointmentUncheckedUpdateWithoutUserInput>
    create: XOR<AppointmentCreateWithoutUserInput, AppointmentUncheckedCreateWithoutUserInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutUserInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutUserInput, AppointmentUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutUserInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutUserInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    userId?: StringFilter<"Appointment"> | string
    timeSlotId?: StringFilter<"Appointment"> | string
    consultationType?: StringFilter<"Appointment"> | string
    reasonForVisit?: StringFilter<"Appointment"> | string
    additionalNotes?: StringNullableFilter<"Appointment"> | string | null
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type ClearanceRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: ClearanceRequestWhereUniqueInput
    update: XOR<ClearanceRequestUpdateWithoutUserInput, ClearanceRequestUncheckedUpdateWithoutUserInput>
    create: XOR<ClearanceRequestCreateWithoutUserInput, ClearanceRequestUncheckedCreateWithoutUserInput>
  }

  export type ClearanceRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: ClearanceRequestWhereUniqueInput
    data: XOR<ClearanceRequestUpdateWithoutUserInput, ClearanceRequestUncheckedUpdateWithoutUserInput>
  }

  export type ClearanceRequestUpdateManyWithWhereWithoutUserInput = {
    where: ClearanceRequestScalarWhereInput
    data: XOR<ClearanceRequestUpdateManyMutationInput, ClearanceRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type ClearanceRequestScalarWhereInput = {
    AND?: ClearanceRequestScalarWhereInput | ClearanceRequestScalarWhereInput[]
    OR?: ClearanceRequestScalarWhereInput[]
    NOT?: ClearanceRequestScalarWhereInput | ClearanceRequestScalarWhereInput[]
    id?: StringFilter<"ClearanceRequest"> | string
    userId?: StringFilter<"ClearanceRequest"> | string
    departmentId?: StringFilter<"ClearanceRequest"> | string
    reason?: StringFilter<"ClearanceRequest"> | string
    otherReason?: StringNullableFilter<"ClearanceRequest"> | string | null
    purpose?: StringFilter<"ClearanceRequest"> | string
    dateNeeded?: DateTimeFilter<"ClearanceRequest"> | Date | string
    additionalInfo?: StringNullableFilter<"ClearanceRequest"> | string | null
    status?: StringFilter<"ClearanceRequest"> | string
    documentUrl?: StringNullableFilter<"ClearanceRequest"> | string | null
    createdAt?: DateTimeFilter<"ClearanceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ClearanceRequest"> | Date | string
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
    appointments?: AppointmentCreateNestedManyWithoutUserInput
    clearanceRequests?: ClearanceRequestCreateNestedManyWithoutUserInput
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
    appointments?: AppointmentUncheckedCreateNestedManyWithoutUserInput
    clearanceRequests?: ClearanceRequestUncheckedCreateNestedManyWithoutUserInput
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
    appointments?: AppointmentUpdateManyWithoutUserNestedInput
    clearanceRequests?: ClearanceRequestUpdateManyWithoutUserNestedInput
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
    appointments?: AppointmentUncheckedUpdateManyWithoutUserNestedInput
    clearanceRequests?: ClearanceRequestUncheckedUpdateManyWithoutUserNestedInput
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
    healthForm?: UserHealthFormCreateNestedOneWithoutUserInput
    appointments?: AppointmentCreateNestedManyWithoutUserInput
    clearanceRequests?: ClearanceRequestCreateNestedManyWithoutUserInput
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
    healthForm?: UserHealthFormUncheckedCreateNestedOneWithoutUserInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutUserInput
    clearanceRequests?: ClearanceRequestUncheckedCreateNestedManyWithoutUserInput
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
    healthForm?: UserHealthFormUpdateOneWithoutUserNestedInput
    appointments?: AppointmentUpdateManyWithoutUserNestedInput
    clearanceRequests?: ClearanceRequestUpdateManyWithoutUserNestedInput
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
    healthForm?: UserHealthFormUncheckedUpdateOneWithoutUserNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutUserNestedInput
    clearanceRequests?: ClearanceRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TimeSlotCreateWithoutConsultationDateInput = {
    id?: string
    startTime: string
    endTime: string
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentCreateNestedOneWithoutTimeSlotInput
  }

  export type TimeSlotUncheckedCreateWithoutConsultationDateInput = {
    id?: string
    startTime: string
    endTime: string
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentUncheckedCreateNestedOneWithoutTimeSlotInput
  }

  export type TimeSlotCreateOrConnectWithoutConsultationDateInput = {
    where: TimeSlotWhereUniqueInput
    create: XOR<TimeSlotCreateWithoutConsultationDateInput, TimeSlotUncheckedCreateWithoutConsultationDateInput>
  }

  export type TimeSlotCreateManyConsultationDateInputEnvelope = {
    data: TimeSlotCreateManyConsultationDateInput | TimeSlotCreateManyConsultationDateInput[]
  }

  export type TimeSlotUpsertWithWhereUniqueWithoutConsultationDateInput = {
    where: TimeSlotWhereUniqueInput
    update: XOR<TimeSlotUpdateWithoutConsultationDateInput, TimeSlotUncheckedUpdateWithoutConsultationDateInput>
    create: XOR<TimeSlotCreateWithoutConsultationDateInput, TimeSlotUncheckedCreateWithoutConsultationDateInput>
  }

  export type TimeSlotUpdateWithWhereUniqueWithoutConsultationDateInput = {
    where: TimeSlotWhereUniqueInput
    data: XOR<TimeSlotUpdateWithoutConsultationDateInput, TimeSlotUncheckedUpdateWithoutConsultationDateInput>
  }

  export type TimeSlotUpdateManyWithWhereWithoutConsultationDateInput = {
    where: TimeSlotScalarWhereInput
    data: XOR<TimeSlotUpdateManyMutationInput, TimeSlotUncheckedUpdateManyWithoutConsultationDateInput>
  }

  export type TimeSlotScalarWhereInput = {
    AND?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
    OR?: TimeSlotScalarWhereInput[]
    NOT?: TimeSlotScalarWhereInput | TimeSlotScalarWhereInput[]
    id?: StringFilter<"TimeSlot"> | string
    startTime?: StringFilter<"TimeSlot"> | string
    endTime?: StringFilter<"TimeSlot"> | string
    isAvailable?: BoolFilter<"TimeSlot"> | boolean
    consultationDateId?: StringFilter<"TimeSlot"> | string
    createdAt?: DateTimeFilter<"TimeSlot"> | Date | string
    updatedAt?: DateTimeFilter<"TimeSlot"> | Date | string
  }

  export type ConsultationDateCreateWithoutTimeSlotsInput = {
    id?: string
    date: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationDateUncheckedCreateWithoutTimeSlotsInput = {
    id?: string
    date: Date | string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConsultationDateCreateOrConnectWithoutTimeSlotsInput = {
    where: ConsultationDateWhereUniqueInput
    create: XOR<ConsultationDateCreateWithoutTimeSlotsInput, ConsultationDateUncheckedCreateWithoutTimeSlotsInput>
  }

  export type AppointmentCreateWithoutTimeSlotInput = {
    id?: string
    consultationType: string
    reasonForVisit: string
    additionalNotes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutTimeSlotInput = {
    id?: string
    userId: string
    consultationType: string
    reasonForVisit: string
    additionalNotes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutTimeSlotInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutTimeSlotInput, AppointmentUncheckedCreateWithoutTimeSlotInput>
  }

  export type ConsultationDateUpsertWithoutTimeSlotsInput = {
    update: XOR<ConsultationDateUpdateWithoutTimeSlotsInput, ConsultationDateUncheckedUpdateWithoutTimeSlotsInput>
    create: XOR<ConsultationDateCreateWithoutTimeSlotsInput, ConsultationDateUncheckedCreateWithoutTimeSlotsInput>
    where?: ConsultationDateWhereInput
  }

  export type ConsultationDateUpdateToOneWithWhereWithoutTimeSlotsInput = {
    where?: ConsultationDateWhereInput
    data: XOR<ConsultationDateUpdateWithoutTimeSlotsInput, ConsultationDateUncheckedUpdateWithoutTimeSlotsInput>
  }

  export type ConsultationDateUpdateWithoutTimeSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsultationDateUncheckedUpdateWithoutTimeSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpsertWithoutTimeSlotInput = {
    update: XOR<AppointmentUpdateWithoutTimeSlotInput, AppointmentUncheckedUpdateWithoutTimeSlotInput>
    create: XOR<AppointmentCreateWithoutTimeSlotInput, AppointmentUncheckedCreateWithoutTimeSlotInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutTimeSlotInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutTimeSlotInput, AppointmentUncheckedUpdateWithoutTimeSlotInput>
  }

  export type AppointmentUpdateWithoutTimeSlotInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutTimeSlotInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutAppointmentsInput = {
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
    healthForm?: UserHealthFormCreateNestedOneWithoutUserInput
    uploadedForms?: UploadedFormCreateNestedManyWithoutUserInput
    clearanceRequests?: ClearanceRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAppointmentsInput = {
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
    healthForm?: UserHealthFormUncheckedCreateNestedOneWithoutUserInput
    uploadedForms?: UploadedFormUncheckedCreateNestedManyWithoutUserInput
    clearanceRequests?: ClearanceRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
  }

  export type TimeSlotCreateWithoutAppointmentInput = {
    id?: string
    startTime: string
    endTime: string
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    consultationDate: ConsultationDateCreateNestedOneWithoutTimeSlotsInput
  }

  export type TimeSlotUncheckedCreateWithoutAppointmentInput = {
    id?: string
    startTime: string
    endTime: string
    isAvailable?: boolean
    consultationDateId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeSlotCreateOrConnectWithoutAppointmentInput = {
    where: TimeSlotWhereUniqueInput
    create: XOR<TimeSlotCreateWithoutAppointmentInput, TimeSlotUncheckedCreateWithoutAppointmentInput>
  }

  export type UserUpsertWithoutAppointmentsInput = {
    update: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<UserCreateWithoutAppointmentsInput, UserUncheckedCreateWithoutAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAppointmentsInput, UserUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateWithoutAppointmentsInput = {
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
    healthForm?: UserHealthFormUpdateOneWithoutUserNestedInput
    uploadedForms?: UploadedFormUpdateManyWithoutUserNestedInput
    clearanceRequests?: ClearanceRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAppointmentsInput = {
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
    healthForm?: UserHealthFormUncheckedUpdateOneWithoutUserNestedInput
    uploadedForms?: UploadedFormUncheckedUpdateManyWithoutUserNestedInput
    clearanceRequests?: ClearanceRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TimeSlotUpsertWithoutAppointmentInput = {
    update: XOR<TimeSlotUpdateWithoutAppointmentInput, TimeSlotUncheckedUpdateWithoutAppointmentInput>
    create: XOR<TimeSlotCreateWithoutAppointmentInput, TimeSlotUncheckedCreateWithoutAppointmentInput>
    where?: TimeSlotWhereInput
  }

  export type TimeSlotUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: TimeSlotWhereInput
    data: XOR<TimeSlotUpdateWithoutAppointmentInput, TimeSlotUncheckedUpdateWithoutAppointmentInput>
  }

  export type TimeSlotUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consultationDate?: ConsultationDateUpdateOneRequiredWithoutTimeSlotsNestedInput
  }

  export type TimeSlotUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    consultationDateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceRequestCreateWithoutDepartmentInput = {
    id?: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutClearanceRequestsInput
  }

  export type ClearanceRequestUncheckedCreateWithoutDepartmentInput = {
    id?: string
    userId: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClearanceRequestCreateOrConnectWithoutDepartmentInput = {
    where: ClearanceRequestWhereUniqueInput
    create: XOR<ClearanceRequestCreateWithoutDepartmentInput, ClearanceRequestUncheckedCreateWithoutDepartmentInput>
  }

  export type ClearanceRequestCreateManyDepartmentInputEnvelope = {
    data: ClearanceRequestCreateManyDepartmentInput | ClearanceRequestCreateManyDepartmentInput[]
  }

  export type ClearanceRequestUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: ClearanceRequestWhereUniqueInput
    update: XOR<ClearanceRequestUpdateWithoutDepartmentInput, ClearanceRequestUncheckedUpdateWithoutDepartmentInput>
    create: XOR<ClearanceRequestCreateWithoutDepartmentInput, ClearanceRequestUncheckedCreateWithoutDepartmentInput>
  }

  export type ClearanceRequestUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: ClearanceRequestWhereUniqueInput
    data: XOR<ClearanceRequestUpdateWithoutDepartmentInput, ClearanceRequestUncheckedUpdateWithoutDepartmentInput>
  }

  export type ClearanceRequestUpdateManyWithWhereWithoutDepartmentInput = {
    where: ClearanceRequestScalarWhereInput
    data: XOR<ClearanceRequestUpdateManyMutationInput, ClearanceRequestUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type UserCreateWithoutClearanceRequestsInput = {
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
    healthForm?: UserHealthFormCreateNestedOneWithoutUserInput
    uploadedForms?: UploadedFormCreateNestedManyWithoutUserInput
    appointments?: AppointmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClearanceRequestsInput = {
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
    healthForm?: UserHealthFormUncheckedCreateNestedOneWithoutUserInput
    uploadedForms?: UploadedFormUncheckedCreateNestedManyWithoutUserInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClearanceRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClearanceRequestsInput, UserUncheckedCreateWithoutClearanceRequestsInput>
  }

  export type DepartmentCreateWithoutClearanceRequestsInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentUncheckedCreateWithoutClearanceRequestsInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentCreateOrConnectWithoutClearanceRequestsInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutClearanceRequestsInput, DepartmentUncheckedCreateWithoutClearanceRequestsInput>
  }

  export type UserUpsertWithoutClearanceRequestsInput = {
    update: XOR<UserUpdateWithoutClearanceRequestsInput, UserUncheckedUpdateWithoutClearanceRequestsInput>
    create: XOR<UserCreateWithoutClearanceRequestsInput, UserUncheckedCreateWithoutClearanceRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClearanceRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClearanceRequestsInput, UserUncheckedUpdateWithoutClearanceRequestsInput>
  }

  export type UserUpdateWithoutClearanceRequestsInput = {
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
    healthForm?: UserHealthFormUpdateOneWithoutUserNestedInput
    uploadedForms?: UploadedFormUpdateManyWithoutUserNestedInput
    appointments?: AppointmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClearanceRequestsInput = {
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
    healthForm?: UserHealthFormUncheckedUpdateOneWithoutUserNestedInput
    uploadedForms?: UploadedFormUncheckedUpdateManyWithoutUserNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DepartmentUpsertWithoutClearanceRequestsInput = {
    update: XOR<DepartmentUpdateWithoutClearanceRequestsInput, DepartmentUncheckedUpdateWithoutClearanceRequestsInput>
    create: XOR<DepartmentCreateWithoutClearanceRequestsInput, DepartmentUncheckedCreateWithoutClearanceRequestsInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutClearanceRequestsInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutClearanceRequestsInput, DepartmentUncheckedUpdateWithoutClearanceRequestsInput>
  }

  export type DepartmentUpdateWithoutClearanceRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateWithoutClearanceRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type AppointmentCreateManyUserInput = {
    id?: string
    timeSlotId: string
    consultationType: string
    reasonForVisit: string
    additionalNotes?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClearanceRequestCreateManyUserInput = {
    id?: string
    departmentId: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
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

  export type AppointmentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeSlot?: TimeSlotUpdateOneRequiredWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeSlotId?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeSlotId?: StringFieldUpdateOperationsInput | string
    consultationType?: StringFieldUpdateOperationsInput | string
    reasonForVisit?: StringFieldUpdateOperationsInput | string
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneRequiredWithoutClearanceRequestsNestedInput
  }

  export type ClearanceRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeSlotCreateManyConsultationDateInput = {
    id?: string
    startTime: string
    endTime: string
    isAvailable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeSlotUpdateWithoutConsultationDateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneWithoutTimeSlotNestedInput
  }

  export type TimeSlotUncheckedUpdateWithoutConsultationDateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUncheckedUpdateOneWithoutTimeSlotNestedInput
  }

  export type TimeSlotUncheckedUpdateManyWithoutConsultationDateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceRequestCreateManyDepartmentInput = {
    id?: string
    userId: string
    reason: string
    otherReason?: string | null
    purpose: string
    dateNeeded: Date | string
    additionalInfo?: string | null
    status?: string
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClearanceRequestUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClearanceRequestsNestedInput
  }

  export type ClearanceRequestUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClearanceRequestUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    otherReason?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: StringFieldUpdateOperationsInput | string
    dateNeeded?: DateTimeFieldUpdateOperationsInput | Date | string
    additionalInfo?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
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