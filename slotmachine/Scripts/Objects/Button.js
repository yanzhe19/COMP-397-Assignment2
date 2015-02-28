var Objects;
(function (Objects) {
    //<!--File  name: Button.ts, Author's  name: Zhe Yan (300706310), 
    //    Last modified by: Zhe Yan, Date  last  Modified: 2015 - 2 - 26
    //    Program  description: this is a slotmachine game based on createjs.
    //    user can play slotmachine game with this program.
    //    Revision  History: version 2.0-->
    //button class, used to create button in the game.ts
    var Button = (function () {
        //Constructor
        function Button(path, x, y) {
            this._x = x;
            this._y = y;
            this._image = new createjs.Bitmap(path);
            this._image.x = this._x;
            this._image.y = this._y;
            this._image.addEventListener("mouseover", this._buttonOver);
            this._image.addEventListener("mouseout", this._buttonOut);
        }
        // PUBLIC PROPERTIES
        Button.prototype.setX = function (x) {
            this._x = x;
        };
        Button.prototype.getX = function () {
            return this._x;
        };
        Button.prototype.setY = function (y) {
            this._y = y;
        };
        Button.prototype.getY = function () {
            return this._y;
        };
        Button.prototype.getImage = function () {
            return this._image;
        };
        // PRIVATE EVENT HANDLERS
        //button out event for all buttons
        Button.prototype._buttonOut = function (event) {
            event.currentTarget.alpha = 1; // 100% Alpha 
        };
        //button over event for all buttons
        Button.prototype._buttonOver = function (event) {
            event.currentTarget.alpha = 0.7;
        };
        return Button;
    })();
    Objects.Button = Button;
})(Objects || (Objects = {}));
//# sourceMappingURL=button.js.map