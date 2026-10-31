/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/flash-sale/src/app.controller.ts"
/*!***********************************************!*\
  !*** ./apps/flash-sale/src/app.controller.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/flash-sale/src/app.service.ts");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ },

/***/ "./apps/flash-sale/src/app.module.ts"
/*!*******************************************!*\
  !*** ./apps/flash-sale/src/app.module.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/flash-sale/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/flash-sale/src/app.service.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/flash-sale/src/auth/auth.module.ts");
const customers_module_1 = __webpack_require__(/*! ./customers/customers.module */ "./apps/flash-sale/src/customers/customers.module.ts");
const products_module_1 = __webpack_require__(/*! ./products/products.module */ "./apps/flash-sale/src/products/products.module.ts");
const orders_module_1 = __webpack_require__(/*! ./orders/orders.module */ "./apps/flash-sale/src/orders/orders.module.ts");
const carts_module_1 = __webpack_require__(/*! ./carts/carts.module */ "./apps/flash-sale/src/carts/carts.module.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const inventory_module_1 = __webpack_require__(/*! ./inventory/inventory.module */ "./apps/flash-sale/src/inventory/inventory.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            common_2.RedisModule.forRoot(),
            auth_module_1.AuthModule,
            customers_module_1.CustomersModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            carts_module_1.CartsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: false,
            }),
            inventory_module_1.InventoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ },

/***/ "./apps/flash-sale/src/app.service.ts"
/*!********************************************!*\
  !*** ./apps/flash-sale/src/app.service.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ },

/***/ "./apps/flash-sale/src/auth/auth.controller.ts"
/*!*****************************************************!*\
  !*** ./apps/flash-sale/src/auth/auth.controller.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/flash-sale/src/auth/auth.service.ts");
const register_dto_1 = __webpack_require__(/*! ./dto/register.dto */ "./apps/flash-sale/src/auth/dto/register.dto.ts");
const login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ "./apps/flash-sale/src/auth/dto/login.dto.ts");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ },

/***/ "./apps/flash-sale/src/auth/auth.module.ts"
/*!*************************************************!*\
  !*** ./apps/flash-sale/src/auth/auth.module.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/flash-sale/src/auth/auth.service.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/flash-sale/src/auth/auth.controller.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const customer_entity_1 = __webpack_require__(/*! ../customers/customer.entity */ "./apps/flash-sale/src/customers/customer.entity.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const carts_entity_1 = __webpack_require__(/*! ../carts/carts.entity */ "./apps/flash-sale/src/carts/carts.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer, carts_entity_1.Cart]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.getOrThrow('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule]
    })
], AuthModule);


/***/ },

/***/ "./apps/flash-sale/src/auth/auth.service.ts"
/*!**************************************************!*\
  !*** ./apps/flash-sale/src/auth/auth.service.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const customer_entity_1 = __webpack_require__(/*! ../customers/customer.entity */ "./apps/flash-sale/src/customers/customer.entity.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const carts_entity_1 = __webpack_require__(/*! ../carts/carts.entity */ "./apps/flash-sale/src/carts/carts.entity.ts");
let AuthService = class AuthService {
    customerRepository;
    cartRepository;
    dataSource;
    jwtServices;
    constructor(customerRepository, cartRepository, dataSource, jwtServices) {
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
        this.dataSource = dataSource;
        this.jwtServices = jwtServices;
    }
    async register(registerDto) {
        return this.dataSource.transaction(async (manager) => {
            const existingCustomer = await manager.findOne(customer_entity_1.Customer, { where: {
                    email: registerDto.email
                } });
            if (existingCustomer)
                throw new common_1.ConflictException('Email already exists');
            const passwordHash = await bcrypt.hash(registerDto.password, 10);
            const newCustomer = manager.create(customer_entity_1.Customer, {
                email: registerDto.email,
                fullName: registerDto.fullName,
                passwordHash: passwordHash
            });
            const savedCustomer = await manager.save(newCustomer);
            const newCart = manager.create(carts_entity_1.Cart, {
                customerId: { id: savedCustomer.id }
            });
            const savedCart = await manager.save(newCart);
            return {
                customer: {
                    id: savedCustomer.id,
                    email: savedCustomer.email,
                    fullName: savedCustomer.fullName
                },
                cart: {
                    id: savedCart.id,
                    customerID: savedCart.customerId
                }
            };
        });
    }
    async login(loginDto) {
        const customer = await this.customerRepository.findOne({ where: { email: loginDto.email } });
        if (!customer)
            throw new common_1.UnauthorizedException('Invalid Email');
        const isMatch = await bcrypt.compare(loginDto.password, customer.passwordHash);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const accessToken = await this.jwtServices.signAsync({
            sub: customer.id,
            email: customer.email,
            role: customer.role,
        });
        return {
            accessToken,
            customer: {
                id: customer.id,
                email: customer.email,
                fullName: customer.fullName
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_2.InjectRepository)(carts_entity_1.Cart)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _c : Object, typeof (_d = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _d : Object])
], AuthService);


/***/ },

/***/ "./apps/flash-sale/src/auth/current-user.decorator.ts"
/*!************************************************************!*\
  !*** ./apps/flash-sale/src/auth/current-user.decorator.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, ctx) => ctx.switchToHttp().getRequest().user);


/***/ },

/***/ "./apps/flash-sale/src/auth/dto/login.dto.ts"
/*!***************************************************!*\
  !*** ./apps/flash-sale/src/auth/dto/login.dto.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password123', minLength: 8 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ },

/***/ "./apps/flash-sale/src/auth/dto/register.dto.ts"
/*!******************************************************!*\
  !*** ./apps/flash-sale/src/auth/dto/register.dto.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class RegisterDto {
    fullName;
    email;
    password;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Smith',
        minLength: 3,
        description: 'Letters and spaces only (apostrophes and hyphens are allowed between letters)',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.Matches)(/^\p{L}+(?:[ '\-]\p{L}+)*$/u, {
        message: 'Full name must contain letters and spaces only',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Password123',
        minLength: 8,
        description: 'At least 8 characters, with one uppercase letter and one number',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
    }),
    (0, class_validator_1.Matches)(/[0-9]/, {
        message: 'Password must contain at least one number',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);


/***/ },

/***/ "./apps/flash-sale/src/auth/jwt-auth.guard.ts"
/*!****************************************************!*\
  !*** ./apps/flash-sale/src/auth/jwt-auth.guard.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        if (type !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Missing token');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            req.user = { userId: payload.sub, email: payload.email, role: payload.role
            };
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ },

/***/ "./apps/flash-sale/src/auth/roles.decorator.ts"
/*!*****************************************************!*\
  !*** ./apps/flash-sale/src/auth/roles.decorator.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ },

/***/ "./apps/flash-sale/src/auth/roles.guard.ts"
/*!*************************************************!*\
  !*** ./apps/flash-sale/src/auth/roles.guard.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const roles_decorator_1 = __webpack_require__(/*! ./roles.decorator */ "./apps/flash-sale/src/auth/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const required = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!required || required.length === 0)
            return true;
        const user = context.switchToHttp().getRequest().user;
        if (!user || !required.includes(user.role)) {
            throw new common_1.ForbiddenException('Admins only');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ },

/***/ "./apps/flash-sale/src/carts/cart-item.entity.ts"
/*!*******************************************************!*\
  !*** ./apps/flash-sale/src/carts/cart-item.entity.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartItem = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const carts_entity_1 = __webpack_require__(/*! ./carts.entity */ "./apps/flash-sale/src/carts/carts.entity.ts");
const products_entity_1 = __webpack_require__(/*! ../products/products.entity */ "./apps/flash-sale/src/products/products.entity.ts");
let CartItem = class CartItem {
    id;
    cart;
    product;
    quantity;
};
exports.CartItem = CartItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => carts_entity_1.Cart, (cart) => cart.items, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'cart_id' }),
    __metadata("design:type", Object)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Product, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", Object)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
exports.CartItem = CartItem = __decorate([
    (0, typeorm_1.Entity)('cart_items')
], CartItem);


/***/ },

/***/ "./apps/flash-sale/src/carts/cart-status.enum.ts"
/*!*******************************************************!*\
  !*** ./apps/flash-sale/src/carts/cart-status.enum.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartStatus = void 0;
var CartStatus;
(function (CartStatus) {
    CartStatus["ACTIVE"] = "ACTIVE";
    CartStatus["ABANDONED"] = "ABANDONED";
})(CartStatus || (exports.CartStatus = CartStatus = {}));


/***/ },

/***/ "./apps/flash-sale/src/carts/carts.controller.ts"
/*!*******************************************************!*\
  !*** ./apps/flash-sale/src/carts/carts.controller.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./apps/flash-sale/src/auth/jwt-auth.guard.ts");
const current_user_decorator_1 = __webpack_require__(/*! ../auth/current-user.decorator */ "./apps/flash-sale/src/auth/current-user.decorator.ts");
const carts_service_1 = __webpack_require__(/*! ./carts.service */ "./apps/flash-sale/src/carts/carts.service.ts");
const add_cart_item_dto_1 = __webpack_require__(/*! ./dto/add-cart-item.dto */ "./apps/flash-sale/src/carts/dto/add-cart-item.dto.ts");
let CartsController = class CartsController {
    cartsService;
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    addItem(user, dto) {
        return this.cartsService.addItem(user.userId, dto);
    }
    getCart(user) {
        return this.cartsService.getCart(user.userId);
    }
};
exports.CartsController = CartsController;
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof add_cart_item_dto_1.AddCartItemDto !== "undefined" && add_cart_item_dto_1.AddCartItemDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "getCart", null);
exports.CartsController = CartsController = __decorate([
    (0, common_1.Controller)('carts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof carts_service_1.CartsService !== "undefined" && carts_service_1.CartsService) === "function" ? _a : Object])
], CartsController);


/***/ },

/***/ "./apps/flash-sale/src/carts/carts.entity.ts"
/*!***************************************************!*\
  !*** ./apps/flash-sale/src/carts/carts.entity.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cart = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const cart_status_enum_1 = __webpack_require__(/*! ./cart-status.enum */ "./apps/flash-sale/src/carts/cart-status.enum.ts");
const customer_entity_1 = __webpack_require__(/*! ../customers/customer.entity */ "./apps/flash-sale/src/customers/customer.entity.ts");
const cart_item_entity_1 = __webpack_require__(/*! ./cart-item.entity */ "./apps/flash-sale/src/carts/cart-item.entity.ts");
let Cart = class Cart {
    id;
    customerId;
    status;
    lastUpdatedAt;
    items;
};
exports.Cart = Cart;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => customer_entity_1.Customer, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", typeof (_a = typeof customer_entity_1.Customer !== "undefined" && customer_entity_1.Customer) === "function" ? _a : Object)
], Cart.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: cart_status_enum_1.CartStatus, default: cart_status_enum_1.CartStatus.ACTIVE }),
    __metadata("design:type", typeof (_b = typeof cart_status_enum_1.CartStatus !== "undefined" && cart_status_enum_1.CartStatus) === "function" ? _b : Object)
], Cart.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'last_updated_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Cart.prototype, "lastUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_item_entity_1.CartItem, (item) => item.cart),
    __metadata("design:type", Object)
], Cart.prototype, "items", void 0);
exports.Cart = Cart = __decorate([
    (0, typeorm_1.Entity)('carts')
], Cart);


/***/ },

/***/ "./apps/flash-sale/src/carts/carts.module.ts"
/*!***************************************************!*\
  !*** ./apps/flash-sale/src/carts/carts.module.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const auth_module_1 = __webpack_require__(/*! ../auth/auth.module */ "./apps/flash-sale/src/auth/auth.module.ts");
const carts_entity_1 = __webpack_require__(/*! ./carts.entity */ "./apps/flash-sale/src/carts/carts.entity.ts");
const cart_item_entity_1 = __webpack_require__(/*! ./cart-item.entity */ "./apps/flash-sale/src/carts/cart-item.entity.ts");
const products_entity_1 = __webpack_require__(/*! ../products/products.entity */ "./apps/flash-sale/src/products/products.entity.ts");
const carts_controller_1 = __webpack_require__(/*! ./carts.controller */ "./apps/flash-sale/src/carts/carts.controller.ts");
const carts_service_1 = __webpack_require__(/*! ./carts.service */ "./apps/flash-sale/src/carts/carts.service.ts");
let CartsModule = class CartsModule {
};
exports.CartsModule = CartsModule;
exports.CartsModule = CartsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([carts_entity_1.Cart, cart_item_entity_1.CartItem, products_entity_1.Product]), auth_module_1.AuthModule],
        controllers: [carts_controller_1.CartsController],
        providers: [carts_service_1.CartsService],
    })
], CartsModule);


/***/ },

/***/ "./apps/flash-sale/src/carts/carts.service.ts"
/*!****************************************************!*\
  !*** ./apps/flash-sale/src/carts/carts.service.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const carts_entity_1 = __webpack_require__(/*! ./carts.entity */ "./apps/flash-sale/src/carts/carts.entity.ts");
const cart_item_entity_1 = __webpack_require__(/*! ./cart-item.entity */ "./apps/flash-sale/src/carts/cart-item.entity.ts");
const cart_status_enum_1 = __webpack_require__(/*! ./cart-status.enum */ "./apps/flash-sale/src/carts/cart-status.enum.ts");
const products_entity_1 = __webpack_require__(/*! ../products/products.entity */ "./apps/flash-sale/src/products/products.entity.ts");
let CartsService = class CartsService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async addItem(customerId, dto) {
        return this.dataSource.transaction(async (manager) => {
            const cart = await manager.findOne(carts_entity_1.Cart, {
                where: { customerId: { id: customerId } },
            });
            if (!cart)
                throw new common_1.NotFoundException('Cart not found');
            const product = await manager.findOne(products_entity_1.Product, {
                where: { id: dto.productId },
            });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            let item = await manager.findOne(cart_item_entity_1.CartItem, {
                where: { cart: { id: cart.id }, product: { id: product.id } },
            });
            if (item) {
                item.quantity += dto.quantity;
            }
            else {
                item = manager.create(cart_item_entity_1.CartItem, { cart, product, quantity: dto.quantity });
            }
            await manager.save(item);
            await manager.update(carts_entity_1.Cart, cart.id, { status: cart_status_enum_1.CartStatus.ACTIVE });
            return { message: 'Item added', productId: product.id, quantity: item.quantity };
        });
    }
    async getCart(customerId) {
        const cart = await this.dataSource.manager.findOne(carts_entity_1.Cart, {
            where: { customerId: { id: customerId } },
            relations: { items: { product: true } },
        });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        return {
            cartId: cart.id,
            status: cart.status,
            items: cart.items.map((i) => ({
                productId: i.product.id,
                name: i.product.name,
                price: i.product.price,
                quantity: i.quantity,
            })),
        };
    }
};
exports.CartsService = CartsService;
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], CartsService);


/***/ },

/***/ "./apps/flash-sale/src/carts/dto/add-cart-item.dto.ts"
/*!************************************************************!*\
  !*** ./apps/flash-sale/src/carts/dto/add-cart-item.dto.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddCartItemDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AddCartItemDto {
    productId;
    quantity;
}
exports.AddCartItemDto = AddCartItemDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AddCartItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AddCartItemDto.prototype, "quantity", void 0);


/***/ },

/***/ "./apps/flash-sale/src/customers/customer.entity.ts"
/*!**********************************************************!*\
  !*** ./apps/flash-sale/src/customers/customer.entity.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customer = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const role_enum_1 = __webpack_require__(/*! ./role.enum */ "./apps/flash-sale/src/customers/role.enum.ts");
let Customer = class Customer {
    id;
    email;
    fullName;
    passwordHash;
    role;
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], Customer.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash' }),
    __metadata("design:type", String)
], Customer.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: role_enum_1.Role, default: role_enum_1.Role.CUSTOMER }),
    __metadata("design:type", typeof (_a = typeof role_enum_1.Role !== "undefined" && role_enum_1.Role) === "function" ? _a : Object)
], Customer.prototype, "role", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('customers')
], Customer);


/***/ },

/***/ "./apps/flash-sale/src/customers/customers.controller.ts"
/*!***************************************************************!*\
  !*** ./apps/flash-sale/src/customers/customers.controller.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CustomersController = class CustomersController {
};
exports.CustomersController = CustomersController;
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.Controller)('customers')
], CustomersController);


/***/ },

/***/ "./apps/flash-sale/src/customers/customers.module.ts"
/*!***********************************************************!*\
  !*** ./apps/flash-sale/src/customers/customers.module.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const customers_service_1 = __webpack_require__(/*! ./customers.service */ "./apps/flash-sale/src/customers/customers.service.ts");
const customers_controller_1 = __webpack_require__(/*! ./customers.controller */ "./apps/flash-sale/src/customers/customers.controller.ts");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        providers: [customers_service_1.CustomersService],
        controllers: [customers_controller_1.CustomersController]
    })
], CustomersModule);


/***/ },

/***/ "./apps/flash-sale/src/customers/customers.service.ts"
/*!************************************************************!*\
  !*** ./apps/flash-sale/src/customers/customers.service.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CustomersService = class CustomersService {
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)()
], CustomersService);


/***/ },

/***/ "./apps/flash-sale/src/customers/role.enum.ts"
/*!****************************************************!*\
  !*** ./apps/flash-sale/src/customers/role.enum.ts ***!
  \****************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["CUSTOMER"] = "CUSTOMER";
})(Role || (exports.Role = Role = {}));


/***/ },

/***/ "./apps/flash-sale/src/inventory/inventory.controller.ts"
/*!***************************************************************!*\
  !*** ./apps/flash-sale/src/inventory/inventory.controller.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const inventory_service_1 = __webpack_require__(/*! ./inventory.service */ "./apps/flash-sale/src/inventory/inventory.service.ts");
const role_enum_1 = __webpack_require__(/*! ../customers/role.enum */ "./apps/flash-sale/src/customers/role.enum.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/roles.decorator */ "./apps/flash-sale/src/auth/roles.decorator.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./apps/flash-sale/src/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../auth/roles.guard */ "./apps/flash-sale/src/auth/roles.guard.ts");
class SetStockDto {
    stock;
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], SetStockDto.prototype, "stock", void 0);
let InventoryController = class InventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    setStock(productId, dto) {
        return this.inventoryService.setStock(productId, dto.stock);
    }
    getStock(productId) {
        return this.inventoryService.getStock(productId);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Post)(':productId/stock'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, SetStockDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "setStock", null);
__decorate([
    (0, common_1.Get)(':productId/stock'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getStock", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [typeof (_a = typeof inventory_service_1.InventoryService !== "undefined" && inventory_service_1.InventoryService) === "function" ? _a : Object])
], InventoryController);


/***/ },

/***/ "./apps/flash-sale/src/inventory/inventory.module.ts"
/*!***********************************************************!*\
  !*** ./apps/flash-sale/src/inventory/inventory.module.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const inventory_controller_1 = __webpack_require__(/*! ./inventory.controller */ "./apps/flash-sale/src/inventory/inventory.controller.ts");
const inventory_service_1 = __webpack_require__(/*! ./inventory.service */ "./apps/flash-sale/src/inventory/inventory.service.ts");
const auth_module_1 = __webpack_require__(/*! ../auth/auth.module */ "./apps/flash-sale/src/auth/auth.module.ts");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [inventory_controller_1.InventoryController],
        providers: [inventory_service_1.InventoryService],
    })
], InventoryModule);


/***/ },

/***/ "./apps/flash-sale/src/inventory/inventory.service.ts"
/*!************************************************************!*\
  !*** ./apps/flash-sale/src/inventory/inventory.service.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let InventoryService = class InventoryService {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    async setStock(productId, stock) {
        await this.redis.setStock(productId, stock);
        return { productId, stock };
    }
    async getStock(productId) {
        const stock = await this.redis.getStock(productId);
        if (stock === null) {
            throw new common_1.NotFoundException(`No Redis stock has been seeded for product ${productId}`);
        }
        return { productId, stock };
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof common_2.RedisService !== "undefined" && common_2.RedisService) === "function" ? _a : Object])
], InventoryService);


/***/ },

/***/ "./apps/flash-sale/src/orders/orders.controller.ts"
/*!*********************************************************!*\
  !*** ./apps/flash-sale/src/orders/orders.controller.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./apps/flash-sale/src/auth/jwt-auth.guard.ts");
const current_user_decorator_1 = __webpack_require__(/*! ../auth/current-user.decorator */ "./apps/flash-sale/src/auth/current-user.decorator.ts");
const orders_service_1 = __webpack_require__(/*! ./orders.service */ "./apps/flash-sale/src/orders/orders.service.ts");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    createOrder(user) {
        return this.ordersService.createOrderFromCart(user.userId);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _a : Object])
], OrdersController);


/***/ },

/***/ "./apps/flash-sale/src/orders/orders.module.ts"
/*!*****************************************************!*\
  !*** ./apps/flash-sale/src/orders/orders.module.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const orders_controller_1 = __webpack_require__(/*! ./orders.controller */ "./apps/flash-sale/src/orders/orders.controller.ts");
const orders_service_1 = __webpack_require__(/*! ./orders.service */ "./apps/flash-sale/src/orders/orders.service.ts");
const inventory_module_1 = __webpack_require__(/*! ../inventory/inventory.module */ "./apps/flash-sale/src/inventory/inventory.module.ts");
const auth_module_1 = __webpack_require__(/*! ../auth/auth.module */ "./apps/flash-sale/src/auth/auth.module.ts");
const products_module_1 = __webpack_require__(/*! ../products/products.module */ "./apps/flash-sale/src/products/products.module.ts");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        controllers: [orders_controller_1.OrdersController],
        imports: [auth_module_1.AuthModule, inventory_module_1.InventoryModule, products_module_1.ProductsModule],
        providers: [orders_service_1.OrdersService],
    })
], OrdersModule);


/***/ },

/***/ "./apps/flash-sale/src/orders/orders.service.ts"
/*!******************************************************!*\
  !*** ./apps/flash-sale/src/orders/orders.service.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrdersService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const carts_entity_1 = __webpack_require__(/*! ../carts/carts.entity */ "./apps/flash-sale/src/carts/carts.entity.ts");
const cart_item_entity_1 = __webpack_require__(/*! ../carts/cart-item.entity */ "./apps/flash-sale/src/carts/cart-item.entity.ts");
const customer_entity_1 = __webpack_require__(/*! ../customers/customer.entity */ "./apps/flash-sale/src/customers/customer.entity.ts");
const products_service_1 = __webpack_require__(/*! ../products/products.service */ "./apps/flash-sale/src/products/products.service.ts");
let OrdersService = OrdersService_1 = class OrdersService {
    dataSource;
    redis;
    products;
    logger = new common_1.Logger(OrdersService_1.name);
    constructor(dataSource, redis, products) {
        this.dataSource = dataSource;
        this.redis = redis;
        this.products = products;
    }
    async createOrderFromCart(customerId) {
        const cart = await this.dataSource.manager.findOne(carts_entity_1.Cart, {
            where: { customerId: { id: customerId } },
            relations: { items: { product: true } },
        });
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        const customer = await this.dataSource.manager.findOneByOrFail(customer_entity_1.Customer, {
            id: customerId,
        });
        const reserved = [];
        const release = async () => {
            for (const r of reserved) {
                await this.redis.incrementStock(r.productId, r.quantity);
            }
        };
        let event;
        try {
            for (const item of cart.items) {
                const productId = Number(item.product.id);
                await this.products.ensureStockCached(productId);
                const remaining = await this.redis.decrementStock(productId, item.quantity);
                reserved.push({ productId, quantity: item.quantity });
                if (remaining < 0) {
                    throw new common_1.BadRequestException(`Out of stock: ${item.product.name}`);
                }
            }
            const items = cart.items.map((i) => ({
                productId: Number(i.product.id),
                productName: i.product.name,
                quantity: i.quantity,
                unitPrice: i.product.price,
            }));
            const totalPrice = Math.round(items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) * 100) / 100;
            event = {
                customerId: Number(customer.id),
                customerEmail: customer.email,
                items,
                totalPrice,
                createdAt: new Date().toISOString(),
            };
            await this.redis.publish(common_2.ORDER_CREATED_CHANNEL, event);
        }
        catch (err) {
            await release();
            throw err;
        }
        try {
            await this.dataSource
                .createQueryBuilder()
                .delete()
                .from(cart_item_entity_1.CartItem)
                .where('cart_id = :cartId', { cartId: cart.id })
                .execute();
        }
        catch (err) {
            this.logger.error(`Order published but cart ${cart.id} was not cleared`, err);
        }
        return {
            message: 'Order placed',
            itemCount: event.items.length,
            totalPrice: event.totalPrice,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object, typeof (_b = typeof common_2.RedisService !== "undefined" && common_2.RedisService) === "function" ? _b : Object, typeof (_c = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _c : Object])
], OrdersService);


/***/ },

/***/ "./apps/flash-sale/src/products/dto/add-stock.dto.ts"
/*!***********************************************************!*\
  !*** ./apps/flash-sale/src/products/dto/add-stock.dto.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddStockDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class AddStockDto {
    quantity;
}
exports.AddStockDto = AddStockDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, minimum: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AddStockDto.prototype, "quantity", void 0);


/***/ },

/***/ "./apps/flash-sale/src/products/dto/create-product.dto.ts"
/*!****************************************************************!*\
  !*** ./apps/flash-sale/src/products/dto/create-product.dto.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateProductDto {
    name;
    price;
    stock;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'iPhone 15', minLength: 3, maxLength: 50 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 999.99, description: 'Unit price, must be greater than 0' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, minimum: 0, description: 'Initial stock quantity' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);


/***/ },

/***/ "./apps/flash-sale/src/products/dto/update-product.dto.ts"
/*!****************************************************************!*\
  !*** ./apps/flash-sale/src/products/dto/update-product.dto.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProductDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class UpdateProductDto {
    name;
    price;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'iPhone 15 Pro', minLength: 3, maxLength: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1099.99, description: 'Unit price, must be greater than 0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);


/***/ },

/***/ "./apps/flash-sale/src/products/products.controller.ts"
/*!*************************************************************!*\
  !*** ./apps/flash-sale/src/products/products.controller.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const products_service_1 = __webpack_require__(/*! ./products.service */ "./apps/flash-sale/src/products/products.service.ts");
const create_product_dto_1 = __webpack_require__(/*! ./dto/create-product.dto */ "./apps/flash-sale/src/products/dto/create-product.dto.ts");
const update_product_dto_1 = __webpack_require__(/*! ./dto/update-product.dto */ "./apps/flash-sale/src/products/dto/update-product.dto.ts");
const add_stock_dto_1 = __webpack_require__(/*! ./dto/add-stock.dto */ "./apps/flash-sale/src/products/dto/add-stock.dto.ts");
const roles_guard_1 = __webpack_require__(/*! ../auth/roles.guard */ "./apps/flash-sale/src/auth/roles.guard.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./apps/flash-sale/src/auth/jwt-auth.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/roles.decorator */ "./apps/flash-sale/src/auth/roles.decorator.ts");
const role_enum_1 = __webpack_require__(/*! ../customers/role.enum */ "./apps/flash-sale/src/customers/role.enum.ts");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async createProduct(createProductDto) {
        return this.productsService.createProduct(createProductDto);
    }
    async getAllProducts() {
        return this.productsService.getAllProducts();
    }
    async getProductById(id) {
        return this.productsService.getProductById(id);
    }
    async updateProduct(id, updateProductDto) {
        return this.productsService.updateProduct(id, updateProductDto);
    }
    async deleteProduct(id) {
        return this.productsService.deleteProduct(id);
    }
    addStock(id, dto) {
        return this.productsService.addStock(id, dto.quantity);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_c = typeof update_product_dto_1.UpdateProductDto !== "undefined" && update_product_dto_1.UpdateProductDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Patch)(':id/stock'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_d = typeof add_stock_dto_1.AddStockDto !== "undefined" && add_stock_dto_1.AddStockDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addStock", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], ProductsController);


/***/ },

/***/ "./apps/flash-sale/src/products/products.entity.ts"
/*!*********************************************************!*\
  !*** ./apps/flash-sale/src/products/products.entity.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Product = class Product {
    id;
    name;
    price;
    stock;
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
            to: (value) => value,
            from: (value) => Number(value),
        },
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);


/***/ },

/***/ "./apps/flash-sale/src/products/products.module.ts"
/*!*********************************************************!*\
  !*** ./apps/flash-sale/src/products/products.module.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const products_controller_1 = __webpack_require__(/*! ./products.controller */ "./apps/flash-sale/src/products/products.controller.ts");
const products_service_1 = __webpack_require__(/*! ./products.service */ "./apps/flash-sale/src/products/products.service.ts");
const products_entity_1 = __webpack_require__(/*! ./products.entity */ "./apps/flash-sale/src/products/products.entity.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const auth_module_1 = __webpack_require__(/*! ../auth/auth.module */ "./apps/flash-sale/src/auth/auth.module.ts");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([products_entity_1.Product]),
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);


/***/ },

/***/ "./apps/flash-sale/src/products/products.service.ts"
/*!**********************************************************!*\
  !*** ./apps/flash-sale/src/products/products.service.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const products_entity_1 = __webpack_require__(/*! ./products.entity */ "./apps/flash-sale/src/products/products.entity.ts");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_3 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let ProductsService = class ProductsService {
    productRepository;
    redis;
    constructor(productRepository, redis) {
        this.productRepository = productRepository;
        this.redis = redis;
    }
    async createProduct(CreateProductDto) {
        const newProduct = this.productRepository.create(CreateProductDto);
        return this.productRepository.save(newProduct);
    }
    async getAllProducts() {
        return this.productRepository.find();
    }
    async getProductById(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_2.NotFoundException(`Product with ID ${id} was not found`);
        }
        return product;
    }
    async updateProduct(id, updateProductDto) {
        const product = await this.productRepository.preload({
            id,
            ...updateProductDto,
        });
        if (!product) {
            throw new common_2.NotFoundException(`Product with ID ${id} was not found`);
        }
        return this.productRepository.save(product);
    }
    async deleteProduct(id) {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new common_2.NotFoundException(`Product with ID ${id} was not found`);
        }
        return {
            message: `Product with ID ${id} was deleted successfully`,
        };
    }
    async addStock(id, quantity) {
        const result = await this.productRepository.increment({ id }, 'stock', quantity);
        if (!result.affected) {
            throw new common_2.NotFoundException('Product not found');
        }
        const product = await this.productRepository.findOneByOrFail({ id });
        const current = await this.redis.getStock(id);
        if (current === null) {
            await this.redis.setStock(id, product.stock);
        }
        else {
            await this.redis.incrementStock(id, quantity);
        }
        return product;
    }
    async ensureStockCached(productId) {
        const cached = await this.redis.getStock(productId);
        if (cached !== null)
            return;
        const product = await this.productRepository.findOne({
            where: { id: productId },
            select: { id: true, stock: true },
        });
        if (!product)
            throw new common_2.NotFoundException('Product not found');
        await this.redis.setStockIfAbsent(productId, product.stock);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof common_3.RedisService !== "undefined" && common_3.RedisService) === "function" ? _b : Object])
], ProductsService);


/***/ },

/***/ "./libs/common/src/common.module.ts"
/*!******************************************!*\
  !*** ./libs/common/src/common.module.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({})
], CommonModule);


/***/ },

/***/ "./libs/common/src/events/order-created.event.ts"
/*!*******************************************************!*\
  !*** ./libs/common/src/events/order-created.event.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ORDER_CREATED_CHANNEL = void 0;
exports.ORDER_CREATED_CHANNEL = 'order.created';


/***/ },

/***/ "./libs/common/src/index.ts"
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./common.module */ "./libs/common/src/common.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./events/order-created.event */ "./libs/common/src/events/order-created.event.ts"), exports);
__exportStar(__webpack_require__(/*! ./redis/redis.module */ "./libs/common/src/redis/redis.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./redis/redis.service */ "./libs/common/src/redis/redis.service.ts"), exports);


/***/ },

/***/ "./libs/common/src/redis/redis.constants.ts"
/*!**************************************************!*\
  !*** ./libs/common/src/redis/redis.constants.ts ***!
  \**************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REDIS_CLIENT = void 0;
exports.REDIS_CLIENT = Symbol('REDIS_CLIENT');


/***/ },

/***/ "./libs/common/src/redis/redis.module.ts"
/*!***********************************************!*\
  !*** ./libs/common/src/redis/redis.module.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RedisModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ioredis_1 = __importDefault(__webpack_require__(/*! ioredis */ "ioredis"));
const redis_constants_1 = __webpack_require__(/*! ./redis.constants */ "./libs/common/src/redis/redis.constants.ts");
const redis_service_1 = __webpack_require__(/*! ./redis.service */ "./libs/common/src/redis/redis.service.ts");
let RedisModule = RedisModule_1 = class RedisModule {
    static forRoot() {
        return {
            module: RedisModule_1,
            imports: [config_1.ConfigModule],
            providers: [
                {
                    provide: redis_constants_1.REDIS_CLIENT,
                    inject: [config_1.ConfigService],
                    useFactory: (config) => new ioredis_1.default({
                        host: config.get('REDIS_HOST', 'localhost'),
                        port: config.get('REDIS_PORT', 6379),
                        password: config.get('REDIS_PASSWORD') || undefined,
                    }),
                },
                redis_service_1.RedisService,
            ],
            exports: [redis_service_1.RedisService, redis_constants_1.REDIS_CLIENT],
        };
    }
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = RedisModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], RedisModule);


/***/ },

/***/ "./libs/common/src/redis/redis.service.ts"
/*!************************************************!*\
  !*** ./libs/common/src/redis/redis.service.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ioredis_1 = __importDefault(__webpack_require__(/*! ioredis */ "ioredis"));
const redis_constants_1 = __webpack_require__(/*! ./redis.constants */ "./libs/common/src/redis/redis.constants.ts");
let RedisService = class RedisService {
    client;
    constructor(client) {
        this.client = client;
    }
    inventoryKey(productId) {
        return `item:${productId}:stock`;
    }
    async setStock(productId, stock) {
        await this.client.set(this.inventoryKey(productId), stock);
    }
    async setStockIfAbsent(productId, stock) {
        const result = await this.client.set(this.inventoryKey(productId), stock, 'NX');
        return result === 'OK';
    }
    async getStock(productId) {
        const value = await this.client.get(this.inventoryKey(productId));
        return value === null ? null : Number(value);
    }
    async decrementStock(productId, quantity) {
        return this.client.decrby(this.inventoryKey(productId), quantity);
    }
    async incrementStock(productId, quantity) {
        return this.client.incrby(this.inventoryKey(productId), quantity);
    }
    async publish(channel, payload) {
        return this.client.publish(channel, JSON.stringify({ pattern: channel, data: payload }));
    }
    createSubscriber() {
        return this.client.duplicate();
    }
    async onModuleDestroy() {
        await this.client.quit();
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_constants_1.REDIS_CLIENT)),
    __metadata("design:paramtypes", [typeof (_a = typeof ioredis_1.default !== "undefined" && ioredis_1.default) === "function" ? _a : Object])
], RedisService);


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/swagger"
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/swagger");

/***/ },

/***/ "@nestjs/typeorm"
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/typeorm");

/***/ },

/***/ "bcrypt"
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
(module) {

module.exports = require("bcrypt");

/***/ },

/***/ "class-transformer"
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
(module) {

module.exports = require("class-transformer");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "ioredis"
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
(module) {

module.exports = require("ioredis");

/***/ },

/***/ "typeorm"
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
(module) {

module.exports = require("typeorm");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************************!*\
  !*** ./apps/flash-sale/src/main.ts ***!
  \*************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/flash-sale/src/app.module.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Flash Sale API')
        .setDescription('Cart, orders, products and inventory for the flash sale engine')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

})();

/******/ })()
;