Array.prototype.slice.call(arrayLike);

Array.prototype.splice.call(arrayLike, 0);

Array.prototype.concat.apply([], arrayLike);

Array.from(arrayLike);
 