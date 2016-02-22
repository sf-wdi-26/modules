#a stack is very similar to an array
class Stack
  def initialize(size)
    #allocate a certain amount of space to the stack
    @size = size
    #create a new array of a certain size
    @store = Array.new(@size)
    #nothing is in the stack
    @top = -1
  end
  
  #return & remove the top item from the stack
  def pop
    if empty?
      nil
    else
      popped = @store[@top]
      @store[@top] = nil
      #decrement top
      @top = @top.pred
      popped
    end
  end
  
  #add an item to the stack
  def push(element)
    #if the stack is full or the element is nil don't add it to the stack
    if full? or element.nil?
      nil
    else
      #increment top by one
      @top = @top.succ
      #store the element in the new top's position
      @store[@top] = element
      #return the instance of the stack
      self
    end
  end

  #getter for size attribute
  def size
    @size
  end
  
  private

  def full?
    #the stack is full
    @top == (@size - 1)
  end
  
  def empty?
    #the stack is empty
    @top == -1
  end
end