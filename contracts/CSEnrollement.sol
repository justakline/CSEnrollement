pragma solidity ^0.8.19;
import "../node_modules/hardhat/console.sol";

contract CSEnrollment {
    enum EnrollmentType {
        UNDERGRADUATE,
        GRADUATE
    }

    struct Student {
        uint id;
        uint credits;
        bool exists;
        address addr;
    }
    struct Course {
        uint number;
        EnrollmentType courseType;
        Student[] registeredStudents;
        bool exists;
    }

    mapping(uint => Course) courseNumberToCourse;
    mapping(address => uint) studentAddressToCourseNumber;
    mapping(address => Student) addressToStudent;
    uint studentCount = 0;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "not the owner");
        _;
    }
    event printRoster();

    constructor() {
        owner = msg.sender;
        add(670, EnrollmentType.GRADUATE);
        add(617, EnrollmentType.GRADUATE);
        add(484, EnrollmentType.UNDERGRADUATE);
        add(431, EnrollmentType.UNDERGRADUATE);
    }

    function register(
        uint credits,
        EnrollmentType studentType,
        uint courseNumber
    ) public {
        //Checking if the student is already associated with course or not, if given default value, then the student isnt associated with a course or the course doesnt exist
        //So if it is not 0, then they are already registed and arent allowed to register again
        require(
            studentAddressToCourseNumber[msg.sender] == 0,
            "Already Registed"
        );

        //The course must exist
        require(
            courseNumberToCourse[courseNumber].exists,
            "The course does not exist"
        );

        //require the number of students in a course to be less than or equal to 30
        require(
            courseNumberToCourse[courseNumber].registeredStudents.length <= 30,
            "Too many students are in the course"
        );

        //require that if they are a grad student that the number of credits they have is greater than 20
        require(
            (studentType == EnrollmentType.GRADUATE && credits >= 20) ||
                (studentType == EnrollmentType.UNDERGRADUATE),
            "not enough credits"
        );

        //If the student does not exist, make them into one
        if (addressToStudent[msg.sender].exists == false) {
            Student memory tempStudent = Student(
                studentCount,
                0,
                true,
                msg.sender
            );
            addressToStudent[msg.sender] = tempStudent;
            studentCount += 1;
        }

        if (
            studentType == EnrollmentType.UNDERGRADUATE &&
            (courseNumber == 431 || courseNumber == 484)
        ) {
            Course storage course = courseNumberToCourse[courseNumber];
            //Then register them
            studentAddressToCourseNumber[msg.sender] = courseNumber;
            addressToStudent[msg.sender].credits += credits;
            course.registeredStudents.push(addressToStudent[msg.sender]);
        } else if (
            studentType == EnrollmentType.GRADUATE &&
            courseNumber != 431 &&
            addressToStudent[msg.sender].credits > 20
        ) {
            //Then register them
            Course storage course = courseNumberToCourse[courseNumber];
            studentAddressToCourseNumber[msg.sender] = courseNumber;
            addressToStudent[msg.sender].credits += credits;
            course.registeredStudents.push(addressToStudent[msg.sender]);
        } else {
            revert("Did not register for the correct course");
        }
    }

    //Only to owner can add a course
    function add(
        uint courseNumber,
        EnrollmentType studentType
    ) public onlyOwner {
        // The course must not already exist
        require(
            !courseNumberToCourse[courseNumber].exists,
            "course already exists"
        );

        //Do not create the student array because it initializes
        //a memory location and not a storage location
        //Also it defaults to an empty array anyways so it doesnt matter
        courseNumberToCourse[courseNumber].number = courseNumber;
        courseNumberToCourse[courseNumber].courseType = studentType;
        courseNumberToCourse[courseNumber].exists = true;
    }

    //Gets the roster of a course
    function getRoster(uint courseNumber) public view {
        require(
            courseNumberToCourse[courseNumber].exists,
            "course does not exist"
        );
        Student[] memory students = courseNumberToCourse[courseNumber]
            .registeredStudents;

        for (uint i = 0; i < students.length; i++) {
            console.log(students[i].addr);
        }
    }

    //For testing
    function courseExists(uint courseNumber) public view returns (bool) {
        return courseNumberToCourse[courseNumber].exists;
    }
}
