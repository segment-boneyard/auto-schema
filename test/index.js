
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
    s.should.eql({ user: 'varchar(2048)' });
  })

  it('should allow specifying a length', function(){
    var s = schema({ user: 'tobi' }, { varchar: 100 });
    s.should.eql({ user: 'varchar(100)' });
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
      Foo_Bar: 'varchar(2048)',
      Something_Here: 'varchar(2048)',
      foo_bar_Baz: 'varchar(2048)'
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
      'user.first': 'varchar(2048)',
      'user.last': 'varchar(2048)',
      'user.age': 'float',
      'timestamp': 'timestamp'
    })
  })
})