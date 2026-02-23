class Person:
    def __init__(self, name):
        self.name = name

class Employee(Person):
    def __init__(self, name, emp_id):
        super().__init__(name)   # initialize parent
        self.emp_id = emp_id
#Now the object is complete:

e = Employee("prajwal", 101)
print(e.name)    # prajwal
print(e.emp_id)  # 101

