import {RayTracer} from "./rayTracer"

// A class for our application state and functionality
class TestRT extends RayTracer {
    
    constructor (div: HTMLElement) {
        super(div, 500, 500, 100, 100)

        document.addEventListener("keydown", (event) => {
            this.keyPressed(event.key)
        });

        this.clear_screen()
    }

    keyPressed(key: string) {
        console.log ("key pressed\n");
        switch(key) {
          case '0':  this.scene_00(); break;
          case '1':  this.scene_01(); break;
          case '2':  this.scene_02(); break;
          case '3':  this.scene_03(); break;
          case '4':  this.scene_04(); break;
        }
      }
      
      scene_00() {
        console.log ("start of scene_00\n");
        
        this.reset_scene();
        this.set_background (0.9, 0.4, 0.5);

        this.draw_scene();
      }

      // one diffuse red sphere
      scene_01() {
        
        console.log ("start of scene_01\n");
        
        this.reset_scene();
        this.set_background (0.4, 0.4, 0.9);
        
        this.set_fov (60.0);
        this.set_eye (0,0,0, 0,0,-1, 0,1,0);
        
        this.new_light (1, 1, 1, 7, 4, 5);
        
        //  sphere: x,y,z, radius, diff_red, diff_green, diff_blue, k_ambient, k_spec, k_pow
        this.new_sphere (0, 0, -4,  1, 0.9, 0.0, 0.0, 0.0, 0.0, 1.0);
        
        this.draw_scene();
      }
      
      // two spheres
      scene_02() {
        
        console.log ("start of scene_02\n");
        
        this.reset_scene();
        this.set_background (0.4, 0.2, 0.9);
        
        this.set_fov (60.0);
        this.set_eye (4,0,0, 1,0,0, 0,1,0);
        
        this.new_light (1, 1, 1, 7, 7, -5);
        this.ambient_light (0.1, 0.1, 0.4);
        
        this.new_sphere (0, 0, 0,       1,   0, 0.5, 0,   1.0, 0.6, 200);
        this.new_sphere (1, 0.6, -1,  0.3,   0.6, 0, 0,   0.5, 0, 0);
        
        this.draw_scene();
      }
      
      // one sphere lit by multiple colored lights
      scene_03() {
        
        console.log ("start of scene_03\n");
        
        this.reset_scene();
        this.set_background (0.2, 0.4, 0.9);
        
        this.set_fov (60.0);
        this.set_eye (0,0,0, 0,0,-1, 0,1,0);
        
        this.new_light (0.8, 0.2, 0.2, 3, 4, 0);
        this.new_light (0.2, 0.8, 0.2, -3, 4, 0);
        this.new_light (0.2, 0.2, 0.8, 0, 4, -5);
        
        this.ambient_light (0.2, 0.2, 0.2);
        
        this.new_sphere (0, 0.5, -3, 1, 0.8, 0.8, 0.8, 0.2, 0, 0);
        
        this.draw_scene();
      }
      
      // several spheres that intersect each other
      scene_04() {
        
        console.log ("start of scene_04\n");
        
        this.reset_scene();
        this.set_background (0.9, 0.4, 0.2);
        
        this.set_fov (60.0);
        // this.set_eye_position (0.0, 0.0, 0.0);
        // this.set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
        this.set_eye (0,0,0, 0,0,-1, 0,1,0);
        
        this.new_light (1, 1, 1, 2.5, 1, 0);
        
        this.ambient_light (0.2, 0.2, 0.2);
        
        // body
        this.new_sphere (0.6, 0, -3, 0.5, 0.8, 0.8, 0.8, 0.2, 0, 0);
        this.new_sphere (0, 0, -3, 0.45, 0.8, 0.8, 0.8, 0.2, 0, 0);
        this.new_sphere (-0.6, 0, -3, 0.4, 0.8, 0.8, 0.8, 0.2, 0, 0);
        this.new_sphere (-1.1, 0, -3, 0.35, 0.8, 0.8, 0.8, 0.2, 0, 0);
        
        // eyes
        this.new_sphere (0.8, 0.3, -2.65, 0.1, 0.2, 0.2, 0.7, 0.2, 1, 125);
        this.new_sphere (0.5, 0.3, -2.6, 0.095, 0.2, 0.2, 0.7, 0.2, 1, 125);
        
        // nose
        this.new_sphere (0.62, 0.1, -2.5, 0.09, 0.2, 0.7, 0.2, 0.2, 0, 0);
        
        this.draw_scene();
      }
      
      // dummy function, not really used
      draw() {
      }      
}

// a global variable for our state
var tracer: TestRT


// main function, to keep things together and keep the variables created self contained
function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    tracer = new TestRT(div);
}

exec()