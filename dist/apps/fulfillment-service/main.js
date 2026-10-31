/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/fulfillment-service/src/fulfillment-service.module.ts"
/*!********************************************************************!*\
  !*** ./apps/fulfillment-service/src/fulfillment-service.module.ts ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FulfillmentServiceModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const bullmq_1 = __webpack_require__(/*! @nestjs/bullmq */ "@nestjs/bullmq");
const order_events_controller_1 = __webpack_require__(/*! ./order-events.controller */ "./apps/fulfillment-service/src/order-events.controller.ts");
const orders_service_1 = __webpack_require__(/*! ./orders/orders.service */ "./apps/fulfillment-service/src/orders/orders.service.ts");
const order_item_entity_1 = __webpack_require__(/*! apps/fulfillment-service/src/orders/order-item.entity */ "./apps/fulfillment-service/src/orders/order-item.entity.ts");
const notifications_processor_1 = __webpack_require__(/*! ./notifications/notifications.processor */ "./apps/fulfillment-service/src/notifications/notifications.processor.ts");
const notifications_constants_1 = __webpack_require__(/*! ./notifications/notifications.constants */ "./apps/fulfillment-service/src/notifications/notifications.constants.ts");
const order_entity_1 = __webpack_require__(/*! apps/fulfillment-service/src/orders/order.entity */ "./apps/fulfillment-service/src/orders/order.entity.ts");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const abandoned_cart_cron_1 = __webpack_require__(/*! ./notifications/abandoned-cart.cron */ "./apps/fulfillment-service/src/notifications/abandoned-cart.cron.ts");
let FulfillmentServiceModule = class FulfillmentServiceModule {
};
exports.FulfillmentServiceModule = FulfillmentServiceModule;
exports.FulfillmentServiceModule = FulfillmentServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
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
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, order_item_entity_1.OrderItem]),
            bullmq_1.BullModule.forRoot({ connection: { host: 'localhost', port: 6379 } }),
            bullmq_1.BullModule.registerQueue({
                name: notifications_constants_1.NOTIFICATIONS_QUEUE,
                defaultJobOptions: {
                    attempts: 4,
                    backoff: { type: 'custom' },
                    removeOnComplete: true,
                    removeOnFail: false,
                },
            }),
        ],
        controllers: [order_events_controller_1.OrderEventsController],
        providers: [orders_service_1.OrdersService, notifications_processor_1.NotificationsProcessor, abandoned_cart_cron_1.AbandonedCartCron],
    })
], FulfillmentServiceModule);


/***/ },

/***/ "./apps/fulfillment-service/src/notifications/abandoned-cart.cron.ts"
/*!***************************************************************************!*\
  !*** ./apps/fulfillment-service/src/notifications/abandoned-cart.cron.ts ***!
  \***************************************************************************/
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
var AbandonedCartCron_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbandonedCartCron = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const bullmq_1 = __webpack_require__(/*! @nestjs/bullmq */ "@nestjs/bullmq");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const bullmq_2 = __webpack_require__(/*! bullmq */ "bullmq");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const notifications_constants_1 = __webpack_require__(/*! ./notifications.constants */ "./apps/fulfillment-service/src/notifications/notifications.constants.ts");
let AbandonedCartCron = AbandonedCartCron_1 = class AbandonedCartCron {
    queue;
    dataSource;
    logger = new common_1.Logger(AbandonedCartCron_1.name);
    constructor(queue, dataSource) {
        this.queue = queue;
        this.dataSource = dataSource;
    }
    async enqueueAbandonedCarts() {
        const minutes = Number(process.env.ABANDONED_AFTER_MINUTES ?? 1440);
        const carts = await this.dataSource.query(`SELECT c.id, cu.email
         FROM carts c
         JOIN customers cu ON cu.id = c.customer_id
        WHERE c.status = 'ACTIVE'
          AND c.last_updated_at < NOW() - INTERVAL ? MINUTE
          AND EXISTS (SELECT 1 FROM cart_items ci WHERE ci.cart_id = c.id)`, [minutes]);
        if (carts.length === 0)
            return;
        this.logger.log(`Found ${carts.length} abandoned cart(s)`);
        for (const cart of carts) {
            const cartId = Number(cart.id);
            await this.queue.add(notifications_constants_1.NotificationJob.AbandonedCart, { cartId, customerEmail: cart.email }, { jobId: `abandoned-${cartId}-${new Date().toISOString().slice(0, 10)}` });
            await this.dataSource.query(`UPDATE carts SET status = 'ABANDONED' WHERE id = ?`, [cartId]);
        }
    }
};
exports.AbandonedCartCron = AbandonedCartCron;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AbandonedCartCron.prototype, "enqueueAbandonedCarts", null);
exports.AbandonedCartCron = AbandonedCartCron = AbandonedCartCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(notifications_constants_1.NOTIFICATIONS_QUEUE)),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof bullmq_2.Queue !== "undefined" && bullmq_2.Queue) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object])
], AbandonedCartCron);


/***/ },

/***/ "./apps/fulfillment-service/src/notifications/notifications.constants.ts"
/*!*******************************************************************************!*\
  !*** ./apps/fulfillment-service/src/notifications/notifications.constants.ts ***!
  \*******************************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationJob = exports.NOTIFICATIONS_QUEUE = void 0;
exports.NOTIFICATIONS_QUEUE = 'notifications-queue';
var NotificationJob;
(function (NotificationJob) {
    NotificationJob["OrderReceipt"] = "order-receipt";
    NotificationJob["AbandonedCart"] = "abandoned-cart";
})(NotificationJob || (exports.NotificationJob = NotificationJob = {}));


/***/ },

/***/ "./apps/fulfillment-service/src/notifications/notifications.processor.ts"
/*!*******************************************************************************!*\
  !*** ./apps/fulfillment-service/src/notifications/notifications.processor.ts ***!
  \*******************************************************************************/
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
var NotificationsProcessor_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsProcessor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bullmq_1 = __webpack_require__(/*! @nestjs/bullmq */ "@nestjs/bullmq");
const bullmq_2 = __webpack_require__(/*! bullmq */ "bullmq");
const resend_1 = __webpack_require__(/*! resend */ "resend");
const notifications_constants_1 = __webpack_require__(/*! ./notifications.constants */ "./apps/fulfillment-service/src/notifications/notifications.constants.ts");
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let NotificationsProcessor = NotificationsProcessor_1 = class NotificationsProcessor extends bullmq_1.WorkerHost {
    logger = new common_1.Logger(NotificationsProcessor_1.name);
    resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    async process(job) {
        this.logger.log(`Processing ${job.id}, attempts configured: ${job.opts.attempts}`);
        switch (job.name) {
            case notifications_constants_1.NotificationJob.OrderReceipt:
                return this.sendReceipt(job.data);
            case notifications_constants_1.NotificationJob.AbandonedCart:
                return this.sendAbandonedCart(job.data);
            default:
                throw new bullmq_2.UnrecoverableError(`Unknown job name: ${job.name}`);
        }
    }
    async sendReceipt(d) {
        const rows = d.items
            .map((i) => `<li>${escapeHtml(i.productName)} &times; ${i.quantity} &ndash; $${(i.unitPrice * i.quantity).toFixed(2)}</li>`)
            .join('');
        const { data, error } = await this.resend.emails.send({
            from: 'Flash Sale <onboarding@resend.dev>',
            to: d.customerEmail,
            subject: `Order Confirmation #${d.orderId} - Flash Sale Store`,
            html: `<p>Hello Customer,</p>
      <p>Thank you for your purchase! Here is your order receipt:</p>
      <ul>${rows}</ul>
      <p><strong>Total Paid: $${d.totalPrice.toFixed(2)}</strong></p>
      <p>We are preparing your order for shipment!</p>`,
        });
        if (error) {
            const status = error.statusCode ?? 500;
            if (status >= 500 || status === 429)
                throw new Error(error.message);
            throw new bullmq_2.UnrecoverableError(error.message);
        }
        this.logger.log(`Resend accepted the email, id: ${data?.id}`);
    }
    async sendAbandonedCart(d) {
        const { data, error } = await this.resend.emails.send({
            from: 'Flash Sale <onboarding@resend.dev>',
            to: d.customerEmail,
            subject: 'You left something behind!',
            html: `<p>You left something behind!</p>
      <p>Complete your order now and get 10% off.</p>`,
        });
        if (error) {
            const status = error.statusCode ?? 500;
            if (status >= 500 || status === 429)
                throw new Error(error.message);
            throw new bullmq_2.UnrecoverableError(error.message);
        }
        this.logger.log(`Abandoned-cart email sent, id: ${data?.id}`);
    }
    onCompleted(job) {
        this.logger.log(`Job ${job.id} completed`);
    }
    onFailed(job, err) {
        this.logger.warn(`Job ${job.id} failed (attempt ${job.attemptsMade}/${job.opts.attempts}): ${err.message}`);
    }
};
exports.NotificationsProcessor = NotificationsProcessor;
__decorate([
    (0, bullmq_1.OnWorkerEvent)('completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof bullmq_2.Job !== "undefined" && bullmq_2.Job) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], NotificationsProcessor.prototype, "onCompleted", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof bullmq_2.Job !== "undefined" && bullmq_2.Job) === "function" ? _b : Object, typeof (_c = typeof Error !== "undefined" && Error) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], NotificationsProcessor.prototype, "onFailed", null);
exports.NotificationsProcessor = NotificationsProcessor = NotificationsProcessor_1 = __decorate([
    (0, bullmq_1.Processor)(notifications_constants_1.NOTIFICATIONS_QUEUE, {
        concurrency: 5,
        settings: {
            backoffStrategy: (attemptsMade) => 5000 * 3 ** (attemptsMade - 1),
        },
    })
], NotificationsProcessor);


/***/ },

/***/ "./apps/fulfillment-service/src/order-events.controller.ts"
/*!*****************************************************************!*\
  !*** ./apps/fulfillment-service/src/order-events.controller.ts ***!
  \*****************************************************************/
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
exports.OrderEventsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const bullmq_1 = __webpack_require__(/*! @nestjs/bullmq */ "@nestjs/bullmq");
const bullmq_2 = __webpack_require__(/*! bullmq */ "bullmq");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const notifications_constants_1 = __webpack_require__(/*! ./notifications/notifications.constants */ "./apps/fulfillment-service/src/notifications/notifications.constants.ts");
const orders_service_1 = __webpack_require__(/*! ./orders/orders.service */ "./apps/fulfillment-service/src/orders/orders.service.ts");
let OrderEventsController = class OrderEventsController {
    queue;
    orders;
    constructor(queue, orders) {
        this.queue = queue;
        this.orders = orders;
    }
    async onOrderCreated(event) {
        const order = await this.orders.create(event);
        await this.queue.add(notifications_constants_1.NotificationJob.OrderReceipt, {
            orderId: order.id,
            customerEmail: event.customerEmail,
            items: event.items.map((i) => ({
                productName: i.productName,
                quantity: i.quantity,
                unitPrice: i.unitPrice,
            })),
            totalPrice: event.totalPrice,
        }, { jobId: `receipt-${order.id}` });
    }
};
exports.OrderEventsController = OrderEventsController;
__decorate([
    (0, microservices_1.EventPattern)(common_2.ORDER_CREATED_CHANNEL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderEventsController.prototype, "onOrderCreated", null);
exports.OrderEventsController = OrderEventsController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, bullmq_1.InjectQueue)(notifications_constants_1.NOTIFICATIONS_QUEUE)),
    __metadata("design:paramtypes", [typeof (_a = typeof bullmq_2.Queue !== "undefined" && bullmq_2.Queue) === "function" ? _a : Object, typeof (_b = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _b : Object])
], OrderEventsController);


/***/ },

/***/ "./apps/fulfillment-service/src/orders/order-item.entity.ts"
/*!******************************************************************!*\
  !*** ./apps/fulfillment-service/src/orders/order-item.entity.ts ***!
  \******************************************************************/
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
exports.OrderItem = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let OrderItem = class OrderItem {
    id;
    orderId;
    productId;
    quantity;
    unitPrice;
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_id', type: 'bigint', unsigned: true }),
    __metadata("design:type", String)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "unitPrice", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)('order_items')
], OrderItem);


/***/ },

/***/ "./apps/fulfillment-service/src/orders/order.entity.ts"
/*!*************************************************************!*\
  !*** ./apps/fulfillment-service/src/orders/order.entity.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Order = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Order = class Order {
    id;
    customerId;
    totalPrice;
    createdAt;
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true }),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'bigint', unsigned: true }),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Order.prototype, "createdAt", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('orders')
], Order);


/***/ },

/***/ "./apps/fulfillment-service/src/orders/orders.service.ts"
/*!***************************************************************!*\
  !*** ./apps/fulfillment-service/src/orders/orders.service.ts ***!
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
var OrdersService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const order_entity_1 = __webpack_require__(/*! ./order.entity */ "./apps/fulfillment-service/src/orders/order.entity.ts");
const order_item_entity_1 = __webpack_require__(/*! ./order-item.entity */ "./apps/fulfillment-service/src/orders/order-item.entity.ts");
let OrdersService = OrdersService_1 = class OrdersService {
    dataSource;
    logger = new common_1.Logger(OrdersService_1.name);
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async create(event) {
        const maxAttempts = 3;
        for (let attempt = 1;; attempt++) {
            try {
                return await this.save(event);
            }
            catch (err) {
                const code = err?.code ?? err?.driverError?.code;
                if (code !== 'ER_LOCK_DEADLOCK' || attempt >= maxAttempts)
                    throw err;
                this.logger.warn(`Deadlock, retrying (${attempt}/${maxAttempts})`);
                await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
            }
        }
    }
    async save(event) {
        return this.dataSource.transaction(async (manager) => {
            const sorted = [...event.items].sort((a, b) => a.productId - b.productId);
            for (const i of sorted) {
                await manager.query('UPDATE products SET stock = GREATEST(CAST(stock AS SIGNED) - ?, 0) WHERE id = ?', [i.quantity, i.productId]);
            }
            const order = await manager.save(manager.create(order_entity_1.Order, {
                customerId: event.customerId,
                totalPrice: event.totalPrice,
            }));
            await manager.insert(order_item_entity_1.OrderItem, event.items.map((i) => ({
                orderId: order.id,
                productId: i.productId,
                quantity: i.quantity,
                unitPrice: i.unitPrice,
            })));
            this.logger.log(`Saved order ${order.id} with ${event.items.length} item(s)`);
            return { id: Number(order.id) };
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _a : Object])
], OrdersService);


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

/***/ "@nestjs/bullmq"
/*!*********************************!*\
  !*** external "@nestjs/bullmq" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/bullmq");

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

/***/ "@nestjs/microservices"
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
(module) {

module.exports = require("@nestjs/microservices");

/***/ },

/***/ "@nestjs/schedule"
/*!***********************************!*\
  !*** external "@nestjs/schedule" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/schedule");

/***/ },

/***/ "@nestjs/typeorm"
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/typeorm");

/***/ },

/***/ "bullmq"
/*!*************************!*\
  !*** external "bullmq" ***!
  \*************************/
(module) {

module.exports = require("bullmq");

/***/ },

/***/ "dotenv/config"
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
(module) {

module.exports = require("dotenv/config");

/***/ },

/***/ "ioredis"
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
(module) {

module.exports = require("ioredis");

/***/ },

/***/ "resend"
/*!*************************!*\
  !*** external "resend" ***!
  \*************************/
(module) {

module.exports = require("resend");

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
/*!**********************************************!*\
  !*** ./apps/fulfillment-service/src/main.ts ***!
  \**********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const fulfillment_service_module_1 = __webpack_require__(/*! ./fulfillment-service.module */ "./apps/fulfillment-service/src/fulfillment-service.module.ts");
__webpack_require__(/*! dotenv/config */ "dotenv/config");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(fulfillment_service_module_1.FulfillmentServiceModule, {
        transport: microservices_1.Transport.REDIS,
        options: { host: 'localhost', port: 6379 },
    });
    await app.listen();
}
bootstrap();

})();

/******/ })()
;