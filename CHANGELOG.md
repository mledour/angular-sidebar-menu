# [1.5.0](https://github.com/mledour/angular-sidebar-menu/compare/v1.4.0...v1.5.0) (2021-03-19)


### Features

* menu expandable ([aa4fb83](https://github.com/mledour/angular-sidebar-menu/commit/aa4fb8373aee488a86fef3c05c90613dbb36291e))
* menu mini ([353a53c](https://github.com/mledour/angular-sidebar-menu/commit/353a53cb593af22db83d0bde9a09964af7d2f64a))

# [1.4.0](https://github.com/mledour/angular-sidebar-menu/compare/v1.3.0...v1.4.0) (2021-03-08)


### Features

* trackBy menu item to keep node toggle state and improve performance ([a5a4088](https://github.com/mledour/angular-sidebar-menu/commit/a5a4088c3c2342f88b4eafee7afbf364d466a3ec))

# [1.3.0](https://github.com/mledour/angular-sidebar-menu/compare/v1.2.2...v1.3.0) (2021-03-05)


### Features

* menu item search ([7651cf2](https://github.com/mledour/angular-sidebar-menu/commit/7651cf251e4c87fa58e996ba04d2fa47aa355f4a))


### Performance Improvements

* better changeDetection strategy with Subject instead of EventEmitter for items ([a5edfdd](https://github.com/mledour/angular-sidebar-menu/commit/a5edfdda2fccec5467500d7d186b19a24d58b8be))

## [1.2.2](https://github.com/mledour/angular-sidebar-menu/compare/v1.2.1...v1.2.2) (2021-03-02)


### Bug Fixes

* animation when menu change ([440c32f](https://github.com/mledour/angular-sidebar-menu/commit/440c32fa3ad7294bc3052959efc13c9244cf3160))


### Performance Improvements

* changeDetectionStrategy to OnPush for menu components ([3e6e86a](https://github.com/mledour/angular-sidebar-menu/commit/3e6e86af83553d02bfbc25d7c598f3077339e75e))

## [1.2.1](https://github.com/mledour/angular-sidebar-menu/compare/v1.2.0...v1.2.1) (2021-03-02)


### Bug Fixes

* menu creation after navigationEnd ([6a2439e](https://github.com/mledour/angular-sidebar-menu/commit/6a2439e0427bdcef91557218821adf2670d1c733))

# [1.2.0](https://github.com/mledour/angular-sidebar-menu/compare/v1.1.0...v1.2.0) (2021-03-01)


### Features

* allow multiple independent instances ([c49c580](https://github.com/mledour/angular-sidebar-menu/commit/c49c580d46bf48360078ad2bd691f55be756a1d2))

# [1.1.0](https://github.com/mledour/angular-sidebar-menu/compare/v1.0.0...v1.1.0) (2021-02-28)


### Features

* **roles:** allow role 'none' if menu role is empty string ([e208cde](https://github.com/mledour/angular-sidebar-menu/commit/e208cdee1a800d0102cd94f6d1cf8b0713c1c8b6))
* **roles:** implement menu roles settings to hide or disable menu items ([6756e9f](https://github.com/mledour/angular-sidebar-menu/commit/6756e9fc63dcc6df9e334fcc40a29038e4aa6875))


### Performance Improvements

* **animations:** handle openClose animation overflow with css ([5a77a14](https://github.com/mledour/angular-sidebar-menu/commit/5a77a1462e83fc21a77bf28a75cac55039a2e2d3))

# 1.0.0 (2021-02-12)


### Bug Fixes

* **submenu:** collapse other opened item on open new item ([a872f1e](https://github.com/mledour/angular-sidebar-menu/commit/a872f1edbdf442afb71b9b0087d5a57143fa50d9))


### Features

* add router link active exact match option per menu item ([1e81d83](https://github.com/mledour/angular-sidebar-menu/commit/1e81d83476e56a878ddc5c48f448e6cfcd025d10))
* close nodes when a new node is opened ([07a5bb2](https://github.com/mledour/angular-sidebar-menu/commit/07a5bb2408a560d055363381cbf02a6c47d64ede))
* collapse and toggle icon animations ([ab9969d](https://github.com/mledour/angular-sidebar-menu/commit/ab9969d0eac181c199e2f90eccabe0a4d69dc99d))
* create library ([e6c65f5](https://github.com/mledour/angular-sidebar-menu/commit/e6c65f58cf0042255a6067b4db462abb26dc23cf))
* first level menu badges ([98d5688](https://github.com/mledour/angular-sidebar-menu/commit/98d5688d649cc24d32f59f3ed37577d99d38ad06))
* first level menu icon ([1bbe1a4](https://github.com/mledour/angular-sidebar-menu/commit/1bbe1a46d06849fc5c104f0cac82a66e1db5d134))
* first level menu separator ([6589e05](https://github.com/mledour/angular-sidebar-menu/commit/6589e051cd546eb6be5d4d725d310115dbf3f143))
* implement first level menu ([25d7d65](https://github.com/mledour/angular-sidebar-menu/commit/25d7d65613a4a432a52de5c260fd685ff9c28e92))
* multi level menu ([7384289](https://github.com/mledour/angular-sidebar-menu/commit/73842897bed01eb03502f1ee9d2c0bd71f46a16b))
