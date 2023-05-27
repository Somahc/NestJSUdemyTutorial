import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { ItemsService } from './items.service';
import { Item } from './item.model'

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}
    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id') // /items/id
    findById(@Param('id') id:string): Item {
        return this.itemsService.findById(id);
    }

    @Post()
    create(
        @Body('id') id: string,
        @Body('name') name: string,
        @Body('price') price: number,
        @Body('description') description: string,
    ): Item {
        const item: Item = {
            id,
            name,
            price,
            description,
            status: ItemStatus.ON_SALE
        };

        return this.itemsService.create(item)
    }
}
