export const userDetails = { details :  {
    email: "alex@email.com",
    firstName: "Alex",
    id: 2,
    job_role_id: 3,
    manager_id: 3,
    password: "abc",
    surname: "Gidman",
    system_role_id: 2,
    title: "Mr",
}};

export const managerUserDetails = { details :  {
    id: 3,
    firstName: "Nadia",
    surname: "Rashad",
    title: "Mrs",
    email: "nadia@test.com",
    job_role_id: 3,
    password: "abc",
    system_role_id: 1,
    manager_id: 5
}};

export const skillResp = {
    data: [
      { category_id: 2, description: "Javascript", id: 4 },
      { category_id: 1, description: "Terraform 3", id: 5 },
      { category_id: 3, description: "Excel", id: 6 },
    ],
  };

export const assignedSkillsResp = {
    data: [
        { 
            expiry_date: "2022-08-26",
            id: 33,
            skill_id: 4,
            staff_id: 2,
            strength: "Expert" 
        },
        {
            expiry_date: "2022-08-26",
            id: 34,
            skill_id: 6,
            staff_id: 2,
            strength: "Intermediate"
        }
    ]
}

export const skillTableData = {
    data : [
        {
            expiryData: "2022-08-26",
            skillCategory: "Testing Tools",
            skillId: 35,
            skillName: "Excel",
            skillStrength: "Basic"},
        {
            expiryData: "2023-01-25",
            skillCategory: "Testing Tools",
            skillId: 37,
            skillName: "Terraform",
            skillStrength: "Intermediate"
        }
    ]
}

export const skillTableAfterDeletion = {
    data : [{
            expiryData: "2023-01-25",
            skillCategory: "Testing Tools",
            skillId: 37,
            skillName: "Terraform",
            skillStrength: "Intermediate"
        }
    ]
}

export const newSkill = {
    data : {
        expiryData: "2025-07-31",
        skillCategory: "Testing Tools",
        skillId: 45,
        skillName: "Word",
        skillStrength: "Basic"
    }
}

export const categoryList = {
    data: [
      { description: "Office365", id: 1 },
      { description: "Programming", id: 2 },
    ],
};

export const categoryResp = {
    data: [
        { description: "Office365", id: 1 },
        { description: "Programming", id: 2 },
    ],
  };

export const assignedStaff = {
    data : [
        {
            "id": 1,
            "firstName": "Harry",
            "surname": "Styles",
            "title": "Mr",
            "email": "harry@email.com",
            "job_role_id": 2,
            "password": "abc",
            "system_role_id": 2,
            "manager_id": 3
        },
        {
            "id": 5,
            "firstName": "Archie",
            "surname": "Sanger-Davies",
            "title": "Mr",
            "email": "archie@test.coooom",
            "job_role_id": 3,
            "password": "abc",
            "system_role_id": 1,
            "manager_id": 3
        }
    ]
}
