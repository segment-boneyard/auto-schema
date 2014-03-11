
var schema = require('..');

describe('ints', function(){
  it('should map to floats', function(){
    var s = schema({ count: 1 });
    s.should.eql({ count: 'float' });
  })
})

describe('floats', function(){
  it('should map to floats', function(){
    var s = schema({ count: 1.5 });
    s.should.eql({ count: 'float' });
  })
})

describe('booleans', function(){
  it('should map to booleans', function(){
    var s = schema({ awesome: true });
    s.should.eql({ awesome: 'boolean' });
  })
})

describe('strings', function(){
  it('should map to varchar', function(){
    var s = schema({ user: 'tobi' });
    s.should.eql({ user: 'varchar' });
  })
})

describe('keys', function(){
  it('should be normalized', function(){
    var s = schema({
      'Foo-Bar ': 'baz',
      'Something Here': 'baz',
      foo_bar_Baz: 'something'
    });

    s.should.eql({
      foo_bar: 'varchar',
      something_here: 'varchar',
      foo_bar_baz: 'varchar'
    });
  })

  describe('named "timestamp"', function(){
    it('should map to timestamp', function(){
      var s = schema({ timestamp: 1231241322 });
      s.should.eql({ timestamp: 'timestamp' });
    })
  })
})

describe('nested', function(){
  it('should join keys with "."', function(){
    var s = schema({
      user: {
        first: 'tobi',
        last: 'ferret',
        age: 2
      },
      timestamp: 1231232
    });

    s.should.eql({
      'user.first': 'varchar',
      'user.last': 'varchar',
      'user.age': 'float',
      'timestamp': 'timestamp'
    })
  })
})