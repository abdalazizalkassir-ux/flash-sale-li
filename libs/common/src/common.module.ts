import { Module } from '@nestjs/common';

/**
 * A home for application-neutral shared modules.
 *
 * This library is imported by applications; it is never bootstrapped itself.
 */
@Module({})
export class CommonModule {}
