var Snowman = require("./snowman");

describe( "A snowman", function(){
  var olaf;
  beforeEach(function(){
    olaf = new Snowman("Olaf");
  });

  //My winter wonderland is a friendly place, so I want each snowman to have a name.
  it( "should have a name", function(){
    // var olaf = new Snowman("Olaf");
    expect( olaf.name ).toBeDefined();

  });

  it("should have a scarf", function(){
    expect(olaf.scarf).toBe(true);
  })

  //In order for it to really be a snowman, it needs to have a carrot nose.
  it("should have a carrot nose", function () {
    // expect ( olaf.features ).toContain("carrot nose");
  });

  //It also needs stick arms.
  it("should have stick arms", function () {

  });

  //If the snowman is named Olaf, he should like warm hugs.
  describe( "a snowman named Olaf", function(){

    it( "should like warm hugs", function(){

    });

  });

});