
// require("@nomiclabs/hardhat-ethers");
const main = async () => {

    console.log("do");
    const [owner, gradStudent0, gradStudent1, undergradStudent0, undergradStudent1, undergradStudent2, undergradStudent3] = await hre.ethers.getSigners();

    const CSFactory = await hre.ethers.getContractFactory("CSEnrollment");
    const CSContract = await CSFactory.deploy();
    const address = await CSContract.getAddress();

    const EnrollementType = {
        UNDERGRADUATE: 0,
        GRADUATE: 1
    }

    
    console.log("NOW TESTING REGISTER FUNCTION")
    console.log()
    //Test 1
    console.log("1. Testing undergrad student registering for undergrad course 484")
    try{
        
        await CSContract.connect(undergradStudent0).register(5, EnrollementType.UNDERGRADUATE, 484)
        console.log("Undergrad course 484 roster after registering:")
        await CSContract.getRoster(484);

    }catch(exception){
        console.log("Failed!!!")
        console.log(exception.message)
    }
    console.log()

    //Test 2
    console.log("2. Testing undergrad student registering for second course, course 431")
    try{
        
        await CSContract.connect(undergradStudent0).register(5, EnrollementType.UNDERGRADUATE, 431)
        console.log("Undergrad course 431 roster after registering:")
        await CSContract.getRoster(431);

    }catch(exception){
        console.log("Failed!!!")
        console.log(exception.message)
    }
    console.log()

    //Test 3 
    console.log("3. Testing second undergrad student registering for course 484")
    try{
       
        console.log("Undergrad course 484 roster before registering:")
        await CSContract.getRoster(484);
        await CSContract.connect(undergradStudent1).register(5, EnrollementType.UNDERGRADUATE, 484)
        console.log("Undergrad course 484 roster after registering:")
        await CSContract.getRoster(484);

    }catch(exception){
        console.log("Failed!!!")
        console.log(exception.message)
    }
    console.log()
    
     //Test 4
     console.log("4. Testing undergrad student registering for Grad course 617")
     try{
        
        await CSContract.connect(undergradStudent2).register(5, EnrollementType.UNDERGRADUATE, 617)
        console.log("Grad course 617 roster after registering:")
        await CSContract.getRoster(617);

    }catch(exception){
        console.log("Failed!!!")
        console.log(exception.message)
    }
    console.log()
    
    //Test 5  
    console.log("5. Testing undergrad student course 200 that does not exist")
    try{
      
        await CSContract.connect(undergradStudent2).register(5, EnrollementType.UNDERGRADUATE, 200)
        console.log("Grad course 617 roster after registering:")
        await CSContract.getRoster(200);

    }catch(exception){
        console.log("Failed!!!")
        console.log(exception.message)
    }
    console.log()
    
    //Test 6
    console.log("6. Testing grad student registering for Grad course 617")
    try{
        console.log("Grad course 617 roster before registering:")
        await CSContract.getRoster(617);
        await CSContract.connect(gradStudent0).register(25, EnrollementType.GRADUATE, 617)
        console.log("Grad course 617 roster after registering:")
        await CSContract.getRoster(617);

    }catch(exception){
        console.log("Failed!!!")
        console.log(exception.message)
    }
    console.log()

    //Test 7
    console.log("7. Testing grad student registering for Grad course 617 with less than 20 credits")
    try{
        console.log("Grad course 617 roster before registering:")
        await CSContract.getRoster(617);
        await CSContract.connect(gradStudent1).register(5, EnrollementType.GRADUATE, 617)
        console.log("Grad course 617 roster after registering:")
        await CSContract.getRoster(617);

    }catch(exception){
        console.log("Failed!!!")
        console.log(exception.message)
    }
    console.log()

    //Test 8
    console.log("8. Testing grad student registering for undergrad course 431")
    try{
        console.log("Grad course 431 roster before registering:")
        await CSContract.getRoster(431);
        await CSContract.connect(gradStudent1).register(5, EnrollementType.GRADUATE, 431)
        console.log("Grad course 431 roster after registering:")
        await CSContract.getRoster(431);

    }catch(exception){
        console.log("Failed!!!")
        console.log(exception.message)
    }
    console.log()
    console.log()

    console.log("NOW TESTING ADD FUNCTION")
    console.log()

     //Test 9
     console.log("9. Testing owner adding new undergrad course 200")
     try{
         console.log("Does undergrad course 200 exist?")
         console.log( await CSContract.courseExists(200))
         await CSContract.add(200, EnrollementType.UNDERGRADUATE);
         console.log("Does undergrad course 200 exist?")
         console.log( await CSContract.courseExists(200))
 
     }catch(exception){
         console.log("Failed!!!")
         console.log(exception.message)
     }
     console.log()
 
     //Test 10
     console.log("10. Testing owner adding undergrad course 200 again")
     try{
         console.log("Does undergrad course 200 exist?")
         console.log( await CSContract.courseExists(200))
         await CSContract.add(200, EnrollementType.UNDERGRADUATE);
         console.log("Does undergrad course 200 exist?")
         console.log( await CSContract.courseExists(200))
 
     }catch(exception){
         console.log("Failed!!!")
         console.log(exception.message)
     }
     console.log()

     //Test 11
     console.log("11. Testing non-owner adding new undergrad course 300")
     try{
         console.log("Does undergrad course 300 exist?")
         console.log( await CSContract.courseExists(300))
         await CSContract.add(300, EnrollementType.UNDERGRADUATE);
         console.log("Does undergrad course 300 exist?")
         console.log( await CSContract.courseExists(300))
 
     }catch(exception){
         console.log("Failed!!!")
         console.log(exception.message)
     }
     console.log()
     
     console.log("TESTING GETROSTER FUNCTION!!!")
     console.log()
     console.log()

    //Test 12
     console.log("12. Testing course roster with 0 students, course 670")
     try{

         await CSContract.getRoster(670);
 
     }catch(exception){
         console.log("Failed!!!")
         console.log(exception.message)
     }
     console.log()

     //Test 13
     console.log("13. Testing course roster with more than 0 students, course 484")
     try{

         await CSContract.getRoster(484);
 
     }catch(exception){
         console.log("Failed!!!")
         console.log(exception.message)
     }
     console.log()

      //Test 14
      console.log("14. Testing course roster for a course that does not exist, course 500")
      try{
 
          await CSContract.getRoster(500);
  
      }catch(exception){
          console.log("Failed!!!")
          console.log(exception.message)
      }
      console.log()
        
    
    
    



  
    // console.log("Owner is:", await CSContract.connect(randomPerson).getOwner()); //randomPerson is calling when using connect


};

const runMain = async () => {
    try {

        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();