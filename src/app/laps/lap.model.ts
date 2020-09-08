import { padZeroesToLeft } from 'src/app/utils';

export interface LapData {
    track: number,
    date: Date,
    best_time: number,
    lap_count: number
}

export class Lap {
    constructor(
        public id: number,
        public track: number,
        public date: Date,
        public best_time: number,
        public lap_count: number
    ) {}

    get best_time_str() {
        const min = Math.floor(this.best_time/1000/60);
        const s = Math.floor(
            (this.best_time - min*60*1000) / 1000
        );
        const ms = this.best_time - s*1000 - min*1000*60;
        const str = `${padZeroesToLeft(min, 2)}:${padZeroesToLeft(s, 2)}.${padZeroesToLeft(ms, 3)}`;
        return str;
    }
}
