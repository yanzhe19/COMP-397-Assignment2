module Objects {
    //<!--File  name: Button.ts, Author's  name: Zhe Yan (300706310), 
    //    Last modified by: Zhe Yan, Date  last  Modified: 2015 - 2 - 26
    //    Program  description: this is a slotmachine game based on createjs.
    //user can play slotmachine game with this program.
    //    Revision  History: version 1.0-->

    //button class, used to create button in the game.ts
    export class Button {
        //PRIVATE INSTANCE VARIABLES
        private _image: createjs.Bitmap;
        private _x: number;
        private _y: number;

        //Constructor
        constructor(path: string, x: number, y: number) {
            this._x = x;
            this._y = y;
            this._image = new createjs.Bitmap(path);
            this._image.x = this._x;
            this._image.y = this._y;

            this._image.addEventListener("mouseover", this._buttonOver);
            this._image.addEventListener("mouseout", this._buttonOut);
        }

        // PUBLIC PROPERTIES
        public setX(x: number): void {
            this._x = x;
        }

        public getX(): number {
            return this._x;
        }

        public setY(y: number): void {
            this._y = y;
        }

        public getY(): number {
            return this._y;
        }

        public getImage(): createjs.Bitmap {
            return this._image;
        }


        // PRIVATE EVENT HANDLERS
        //button out event for all buttons
        private _buttonOut(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1; // 100% Alpha 

        }

        //button over event for all buttons
        private _buttonOver(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.7;

        }
    }
}