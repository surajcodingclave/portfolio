number=[5,7,10,6,4]
for num in number:
    a=0
    b=1
    print(f"thee fibonaci series of {num}")
    for i in range(num):
        print(a,end=" ")
        a,b=b,a+b
    print()
