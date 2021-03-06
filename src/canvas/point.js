import {symbol as symbolShape} from 'd3-shape';
import xyBase from '../xyBase';
import { rebind, rebindAll, exclude } from 'd3fc-rebind';
import colors from '../colors';

export default () => {

    const symbol = symbolShape();

    const base = xyBase();

    const point = (data) => {
        const filteredData = data.filter(base.defined);
        const context = symbol.context();

        filteredData.forEach((d, i) => {
            context.save();

            const values = base.values(d, i);
            context.translate(values.origin[0], values.origin[1]);
            context.beginPath();

            symbol(data);

            context.strokeStyle = colors.black;
            context.fillStyle = colors.gray;

            base.decorate()(context, d, i);

            context.stroke();
            context.fill();
            context.closePath();

            context.restore();
        });
    };

    rebindAll(point, base, exclude('baseValue', 'bandwidth', 'align'));
    rebind(point, symbol, 'size', 'type', 'context');

    return point;

};
