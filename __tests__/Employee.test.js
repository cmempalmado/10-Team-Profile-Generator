const Employee = require('../lib/Employee');

test("Can instantiate Employee instance", () => {
    const e = new Employee();
    expect(typeof(e)).toBe("object");
  });

test('creates an employee object', () => {
    const employee = new Employee("testName", 1, "test@email.com");
    expect(employee.name).toBe("testName");
    expect(employee.id).toBe(1);
    expect(employee.email).toBe("test@email.com");
});

test('import employee name', () => {
    const employee = new Employee("testName", 1, "test@email.com");
    expect(employee.getName()).toBe("testName");
});

test('import employee ID', () => {
    const employee = new Employee("testName", 1, "test@email.com");
    expect(employee.getId()).toBe(1);
});

test('import employee email', () => {
    const employee = new Employee("testName", 1, "test@email.com");
    expect(employee.getEmail()).toBe("test@email.com");
});

test('import role of employee', () => {
    const employee = new Employee("testName", 1, "test@email.com");
    expect(employee.getRole()).toBe("Employee");
}); 