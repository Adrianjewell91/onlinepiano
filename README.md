Some Desirables:

Build the online piano lessons platform:
	Make it sound like a piano at least somewhat 
		- stop the speaks from blowing out.
		- get a nicer sound
		- pedal.

	Add a visual keyboard:

	Make the keyboard have no lag at all: do this by using timing synchronization.		
		- pass the event but also the time of the event,
		- this sounds interesting. 

	Users can spin up a new session
		0. Home page with a button that says “start a new session”:
		1. Manage an array of server objects that server the same static file and listen on different ports (can set a max number of servers(lessons)),
			but if this main server crashes then they all crash? Is that true? If not, how do I terminate them?
		2. Then make them separate processes?
		3. Then make it containerized, more scalable later on?

	Deploy this to production in a sensible way.

