function Random() {
    // seedable Park-Miller PRNG
    // https://gist.github.com/blixt/f17b47c62508be59987b
    this.seed = function(seed) {
        this._seed = seed % 2147483647;
    }
    this._seed = 42;
    this.next = function () {
        this._seed = this._seed * 16807 % 2147483647;
        return this._seed;
    };
    this.nextFloat = function () {
        return (this.next() - 1) / 2147483646;
    };
}