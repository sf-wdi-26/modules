class Queue
  def initialize(size)
    @size = size
    @store = Array.new(@size)
    #assigning head to -1 ensures it will always access the last item in the queue
    @head, @tail = -1, 0
  end
  
  def dequeue
    if empty?
      nil
    else
      @tail = @tail.succ
      #access the last item in the queue
      dequeued = @store[@head]
      @store.unshift(nil)
      @store.pop
      dequeued
    end
  end
  
  def enqueue(element)
    if full? or element.nil?
      nil
    else
      @tail = @tail.pred
      @store[@tail] = element
      self 
    end
  end
  
  def size
    @size
  end
  
  private
  
  def empty?
    @head == -1 and @tail == 0
  end

  def full?
    @tail.abs == @size
  end
end