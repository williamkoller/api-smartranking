import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { CreatePlayerDTO } from './dto/create-player.dto'
import { PlayersService } from './players.service'
import { Player } from './interfaces/player.interface'

@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO): Promise<Player> {
        return await this.playersService.createUpdatePlayer(createPlayerDTO)
    }

    @Get()
    async consultPlater(@Query('email') email: string): Promise<Player[] | Player> {
        if (email) {
            return this.playersService.consultByEmail(email)
        }
        return this.playersService.consultAllPlayer()
    }

    @Delete()
    async deletePlayer(@Query('email') email: string): Promise<void> {
        this.playersService.deletePlayer(email)
    }
}
