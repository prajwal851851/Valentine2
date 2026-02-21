#new feature
name='prajwal'
print(f'hello my name is {name}')


#bug fix 
x=10
y=10.5
c=print(x+y)

class Name:
    def __init__(self,name):
        self.name=name

class Age(Name):
    def __init__(self, name,age):
        super().__init__(name)
        self.age=age
              
c=Age("prajwal", 20)
print(f'his name is {c.name} and he is {c.age} year old')              