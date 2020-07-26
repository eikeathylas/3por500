    var CodePageType = 'GENERAL'; // 'PT210'

    // ***************************************************
    //  LIBs
    // ***************************************************

    function RawBtTransport() {
        this.send = function (prn) {
            let S = "#Intent;scheme=rawbt;";
            let P = "package=ru.a402d.rawbtprinter;end;";
            let textEncoded = "base64," + btoa(unescape(prn));
            window.location.href = "intent:" + textEncoded + S + P;
        };

        return this;
    }


    function EscPosDriver() {
        this.defaultCodePages = {
            'CP437': 0,
            'CP932': 1,
            'CP850': 2,
            'CP860': 3,
            'CP863': 4,
            'CP865': 5,
            'CP857': 13,
            'CP737': 14,
            'ISO_8859-7': 15,
            'CP1252': 16,
            'CP866': 17,
            'CP852': 18,
            'CP858': 19,
            'ISO88596': 22,
            'WINDOWS1257': 25,
            'CP864': 28,
            'WINDOWS1255': 32,
            'CP861': 56,
            'CP855': 60,
            'CP862': 62,
            'CP869': 66,
            'WINDOWS1250': 72,
            'WINDOWS1251': 73,
            'WINDOWS1253': 90,
            'WINDOWS1254': 91,
            'WINDOWS1256': 92,
            'WINDOWS1258': 94,
            'CP775': 95,
            'CP874': 255,
            'GBK': -1
        };

        this.goojprtCodePages = {
            "CP437":"0",
            "CP932":"1",
            "CP850":"2",
            "CP860":"3",
            "CP863":"4",
            "CP865":"5",
            "CP1251":"6",
            "CP866":"7",
            "CP775":"9",
            "CP862":"15",
            "CP1252":"16",
            "WINDOWS1253":"17",
            "CP852":"18",
            "CP858":"19",
            "CP864":"22",
            "CP737":"24",
            "WINDOWS1257":"25",
            "CP85":"29",
            "WINDOWS1256":"34",
            "CP874":"47",
            'GBK': "-1"
        };


        function intval (mixedVar, base) {
            var tmp, match

            var type = typeof mixedVar

            if (type === 'boolean') {
                return +mixedVar
            } else if (type === 'string') {
                if (base === 0) {
                    match = mixedVar.match(/^\s*0(x?)/i)
                    base = match ? (match[1] ? 16 : 8) : 10
                }
                tmp = parseInt(mixedVar, base || 10)
                return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp
            } else if (type === 'number' && isFinite(mixedVar)) {
                return mixedVar < 0 ? Math.ceil(mixedVar) : Math.floor(mixedVar)
            } else {
                return 0
            }
        }

        function chr(x) {
            x = intval(x);
            hexString = x.toString(16);
            if (hexString.length % 2) {
                hexString = '0' + hexString;
            }
            return "%" + hexString;
        }

        this.encodeByte = function (b) {
            return chr(b);
        };

        const LF = chr(10);
        const CR = chr(13);
        const ESC = chr(27);
        const FS = chr(28);
        const GS = chr(29);
        const ON = '1';
        const OFF = '0';

        this.lf = function (lines) {
            if (lines === undefined || lines < 2) {
                return LF + CR;
            } else {
                return ESC + "d" + chr(lines);
            }
        };

        this.alignment = function (aligment) {
            return ESC + "a" + chr(aligment);
        };

        this.cut = function (mode, lines) {
            return GS + "V" + chr(mode) + chr(lines);
        };

        this.feedForm = function () {
            return chr(12);
        };

        /**
         * Some slip printers require `ESC q` sequence to release the paper.
         */
        this.release = function () {
            return ESC + chr(113);
        };


        this.feedReverse = function (lines) {
            return ESC + 'e' + chr(1 * lines);
        };

        this.setPrintMode = function (mode) {
            return ESC + "!" + chr(1 * mode);
        };

        this.barcode = function (content, type) {
            return GS + "k" + chr(1 * type) + chr(content.length) + content;
        };

        this.setBarcodeHeight = function (height) {
            return GS + "h" + chr(1 * height);
        };

        this.setBarcodeWidth = function (width) {
            return GS + "w" + chr(1 * width);
        };

        this.setBarcodeTextPosition = function (position) {
            return GS + "H" + chr(1 * position);
        };

        this.emphasis = function (mode) {
            return ESC + "E" + (mode ? ON : OFF);
        };

        this.underline = function (mode) {
            return ESC + "-" + chr(1 * mode);
        };

        this.initialize = function () {
            return ESC + '@';
        };

        this.setCharacterTable = function (number) {
            if(number<0){
              return FS+ '&';
            }
            return FS+ '.'+ ESC + "t" + chr(1 * number);

        };

        this.setDefaultCharacterTable = function (cpname) {
            if(CodePageType=='PT210'){
             return this.setCharacterTable(this.goojprtCodePages[cpname]);
            }
            return this.setCharacterTable(this.defaultCodePages[cpname]);
        };


        this.wrapperSend2dCodeData = function(fn, cn, data, m ){
            if(data===undefined){
                data='';
            }
            if(m===undefined){
                m='';
            }
            let n=data.length+m.length+2;
            header = chr(n%256)+chr(n/256);
            return GS+"(k"+header+cn+fn+m+data;
        };

        this.qrCode = function(code,ec,size,model){
            let r = '';
            let cn = '1'; // Code type for QR code
            // Select model: 1, 2 or micro.
            r +=  this.wrapperSend2dCodeData(String.fromCharCode(65), cn, String.fromCharCode(48 + 1*model) + String.fromCharCode(0));
            // Set dot size.
            r += this.wrapperSend2dCodeData(String.fromCharCode(67), cn, String.fromCharCode(1*size));
            // Set error correction level: L, M, Q, or H
            r += this.wrapperSend2dCodeData(String.fromCharCode(69), cn, String.fromCharCode(48 + 1*ec));
            // Send content & print
            r += this.wrapperSend2dCodeData(String.fromCharCode(80), cn, code, '0');
            r += this.wrapperSend2dCodeData(String.fromCharCode(81), cn, '', '0');

            return r;
        };

        return this;
    }

    function PosPrinterJob(driver, transport) {
        /**
         * @type EscPosDriver
         */
        this.driver = driver;

        /**
         * @type RawBtTransport
         */
        this.transport = transport;


        this.buffer = [];


        // ----------------------------------
        //  CONFIGURE
        // ----------------------------------
        this.encoding = 'CP437';
        this.characterTable = 0;

        this.setEncoding = function (encoding) {
            this.encoding = encoding;
            this.buffer.push(this.driver.setDefaultCharacterTable(encoding.toUpperCase()));
            return this;
        };
        this.setCharacterTable = function (number) {
            this.characterTable = number;
            this.buffer.push(this.driver.setCharacterTable(number));
            return this;
        };


        // ----------------------------------
        //  SEND TO PRINT
        // ----------------------------------

        this.execute = function () {
            this.transport.send(this.buffer.join(''));
            return this;
        };

        // ----------------------------------
        //  HIGH LEVEL FUNCTION
        // ----------------------------------

        this.initialize = function () {
            this.buffer.push(this.driver.initialize());
            return this;
        };


        /**
         *
         * @param {string} string
         */
        this.print = function (string, encoding) {
            let bytes = iconv.encode(string, encoding || this.encoding);
            let s = '';
            let self = this;
            bytes.forEach(function (b) {
                s = s + self.driver.encodeByte(b);
            });
            this.buffer.push(s);
            return this;
        };

        /**
         *
         * @param {string} string
         */
        this.printLine = function (string, encoding) {
            this.print(string, encoding);
            this.buffer.push(this.driver.lf());
            return this;
        };


        this.printText = function (text, aligment, size) {
            if (aligment === undefined) {
                aligment = this.ALIGNMENT_LEFT;
            }
            if (size === undefined) {
                size = this.FONT_SIZE_NORMAL;
            }
            this.setAlignment(aligment);
            this.setPrintMode(size);
            this.printLine(text);
            return this;
        };


        // ----------------------------------
        //  FONTS
        // ----------------------------------

        // user friendly names
        this.FONT_SIZE_SMALL = 1;
        this.FONT_SIZE_NORMAL = 0;
        this.FONT_SIZE_MEDIUM1 = 33;
        this.FONT_SIZE_MEDIUM2 = 16;
        this.FONT_SIZE_MEDIUM3 = 49;
        this.FONT_SIZE_BIG = 48; // BIG

        // bits for ESC !
        this.FONT_A = 0; // A
        this.FONT_B = 1; // B
        this.FONT_EMPHASIZED = 8;
        this.FONT_DOUBLE_HEIGHT = 16;
        this.FONT_DOUBLE_WIDTH = 32;
        this.FONT_ITALIC = 64;
        this.FONT_UNDERLINE = 128;

        this.setPrintMode = function (mode) {
            this.buffer.push(this.driver.setPrintMode(mode));
            return this;
        };


        this.setEmphasis = this.emphasis = function (mode) {
            this.buffer.push(this.driver.emphasis(mode));
            return this;
        };

        this.bold = function (on) {
            if (on === undefined) {
                on = true;
            }
            this.buffer.push(this.driver.emphasis(on));
            return this;
        };

        this.UNDERLINE_NONE = 0;
        this.UNDERLINE_SINGLE = 1;
        this.UNDERLINE_DOUBLE = 2;

        this.underline = function (mode) {
            if (mode === true || mode === undefined) {
                mode = this.UNDERLINE_SINGLE;
            } else if (mode === false) {
                mode = this.UNDERLINE_NONE;
            }
            this.buffer.push(this.driver.underline(mode));
            return this;
        };


        // ----------------------------------
        //  ALIGNMENT
        // ----------------------------------

        this.ALIGNMENT_LEFT = 0;
        this.ALIGNMENT_CENTER = 1;
        this.ALIGNMENT_RIGHT = 2;

        this.setAlignment = function (aligment) {
            if (aligment === undefined) {
                aligment = this.ALIGNMENT_LEFT;
            }

            this.buffer.push(this.driver.alignment(aligment));
            return this;
        };


        // ----------------------------------
        //  BARCODE
        // ----------------------------------

        this.BARCODE_UPCA = 65;
        this.BARCODE_UPCE = 66;
        this.BARCODE_JAN13 = 67;
        this.BARCODE_JAN8 = 68;
        this.BARCODE_CODE39 = 69;
        this.BARCODE_ITF = 70;
        this.BARCODE_CODABAR = 71;
        this.BARCODE_CODE93 = 72;
        this.BARCODE_CODE128 = 73;

        this.printBarCode = function (content, type) {
            if (type === undefined) {
                type = this.BARCODE_CODE39;
            }
            this.buffer.push(this.driver.barcode(content, type));
            return this;
        };

        /**
         * Set barcode height.
         *
         * height Height in dots. If not specified, 8 will be used.
         */
        this.setBarcodeHeight = function (height) {
            if (height === undefined) {
                height = 30;
            }
            this.buffer.push(this.driver.setBarcodeHeight(height));
            return this;
        };

        /**
         * Set barcode bar width.
         *
         * width Bar width in dots. If not specified, 3 will be used.
         *  Values above 6 appear to have no effect.
         */
        this.setBarcodeWidth = function (width) {
            if (width === undefined) {
                width = 3;
            }
            this.buffer.push(this.driver.setBarcodeWidth(width));
            return this;
        };


        /**
         * Indicates that HRI (human-readable interpretation) text should not be
         * printed, when used with Printer::setBarcodeTextPosition
         */
        this.BARCODE_TEXT_NONE = 0;
        /**
         * Indicates that HRI (human-readable interpretation) text should be printed
         * above a barcode, when used with Printer::setBarcodeTextPosition
         */
        this.BARCODE_TEXT_ABOVE = 1;
        /**
         * Indicates that HRI (human-readable interpretation) text should be printed
         * below a barcode, when used with Printer::setBarcodeTextPosition
         */
        this.BARCODE_TEXT_BELOW = 2;


        /**
         * Set the position for the Human Readable Interpretation (HRI) of barcode characters.
         *
         * position. Use Printer::BARCODE_TEXT_NONE to hide the text (default),
         *  or any combination of Printer::BARCODE_TEXT_ABOVE and Printer::BARCODE_TEXT_BELOW
         *  flags to display the text.
         */
        this.setBarcodeTextPosition = function (position) {
            if (position === undefined) {
                position = this.BARCODE_TEXT_NONE;
            }
            this.buffer.push(this.driver.setBarcodeTextPosition(position));
            return this;
        };

        // ----------------------------------
        //  QRCODE
        // ----------------------------------

        this.QR_ECLEVEL_L = 0;
        this.QR_ECLEVEL_M = 1;
        this.QR_ECLEVEL_Q = 2;
        this.QR_ECLEVEL_H = 3;

        this.QR_SIZES_1 = 1;
        this.QR_SIZES_2 = 2;
        this.QR_SIZES_3 = 3;
        this.QR_SIZES_4 = 4;
        this.QR_SIZES_5 = 5;
        this.QR_SIZES_6 = 6;
        this.QR_SIZES_7 = 7;
        this.QR_SIZES_8 = 8;

        this.QR_MODEL_1 = 1;
        this.QR_MODEL_2 = 2;
        this.QR_MICRO = 3;

        this.printQrCode = function (code, ec, size, model) {
            if(ec === undefined){
                ec = this.QR_ECLEVEL_L;
            }
            if(size === undefined){
                size = this.QR_SIZES_3;
            }
            if(model === undefined){
                model = this.QR_MODEL_2;
            }

            this.buffer.push(this.driver.qrCode(code,ec, size, model));
            return this;
        };


        /**
         * Make a full cut, when used with Printer::cut
         */
        this.CUT_FULL = 65;
        /**
         * Make a partial cut, when used with Printer::cut
         */
        this.CUT_PARTIAL = 66;

        this.cut = function (mode, lines = 3) {
            if (mode === undefined) {
                mode = this.CUT_FULL;
            }
            if (lines === undefined) {
                lines = 3;
            }
            this.buffer.push(this.driver.cut(mode, lines));
            return this;
        };

        /**
         * Print and feed line / Print and feed n lines.
         *
         */
        this.feed = this.lf = function (lines) {
            this.buffer.push(this.driver.lf(lines));
            return this;
        };

        /**
         * Some printers require a form feed to release the paper. On most printers, this
         * command is only useful in page mode, which is not implemented in this driver.
         */
        this.feedForm = function () {
            this.buffer.push(this.driver.feedForm());
            return this;
        };


        /**
         * Some slip printers require `ESC q` sequence to release the paper.
         */
        this.release = function () {
            this.buffer.push(this.driver.relese());
            return this;
        };

        /**
         * Print and reverse feed n lines.
         */
        this.feedReverse = function (lines) {
            if (lines === undefined) {
                lines = 1;
            }
            this.buffer.push(this.driver.feedReverse(lines));
            return this;
        };

        // ---------------------------------
        //  SHORT SYNTAX
        // ---------------------------------

        // alignment

        this.left = function () {
            this.buffer.push(this.driver.alignment(this.ALIGNMENT_LEFT));
            return this;
        };

        this.right = function () {
            this.buffer.push(this.driver.alignment(this.ALIGNMENT_RIGHT));
            return this;
        };

        this.center = function () {
            this.buffer.push(this.driver.alignment(this.ALIGNMENT_CENTER));
            return this;
        };


        return this;
    }


    // ==================================================
    // MAIN
    // ===================================================


    function getCurrentTransport() {
       return new RawBtTransport();
    }

    function getCurrentDriver() {
        return new EscPosDriver();
    }