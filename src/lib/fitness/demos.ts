import type { Movement } from "@/lib/fitness/types";

export type LiftDemo = {
  focus: string;
  setup: string;
  steps: string[];
  example: string;
  miss: string;
};

const DEMOS: Record<string, LiftDemo> = {
  "goblet-squat": {
    focus: "Quads and glutes, with the weight held at your chest.",
    setup: "Hold one dumbbell or kettlebell against your chest, elbows pointing down. Feet a bit wider than your hips, toes slightly out.",
    steps: [
      "Sit between your heels until your elbows pass the inside of your knees.",
      "Keep your chest tall. The weight stays glued to your sternum.",
      "Drive the floor away and stand tall without bouncing out of the bottom.",
    ],
    example: "8 reps with a 35 lb kettlebell, the last two still smooth.",
    miss: "Heels lifting, or the weight drifting away from your chest.",
  },
  "kettlebell-swing": {
    focus: "Hips and hamstrings. The bell floats because you hinge, not because you lift with your arms.",
    setup: "Feet shoulder-width. Bell on the floor a foot in front of you. Hinge and hike it back between your legs.",
    steps: [
      "Snap your hips forward. The bell rises to about chest height.",
      "Let it fall, and hinge again so your forearms graze your thighs.",
      "Keep your arms long. They are a rope, not a curl.",
    ],
    example: "10 swings with a 35 lb bell, each one finishing with hips locked.",
    miss: "Squatting the swing, or muscling it overhead with your shoulders.",
  },
  deadlift: {
    focus: "Posterior chain: hamstrings, glutes, and back.",
    setup: "Bar over mid-foot. Hinge, grip just outside your legs, shins close to the bar. Chest up, back flat.",
    steps: [
      "Push the floor away. The bar stays against your legs.",
      "Stand until your hips and knees lock together.",
      "Lower it by hinging first, then bending the knees as it passes them.",
    ],
    example: "5 reps at 115 lb, each rep starting from a dead stop.",
    miss: "Rounding the low back, or yanking the bar off the floor with your arms.",
  },
  "db-bench-press": {
    focus: "Chest, with the shoulders and triceps helping.",
    setup: "Lie on a bench, a dumbbell in each hand, wrists stacked over elbows.",
    steps: [
      "Lower the bells until your upper arms are about parallel to the floor.",
      "Press up and slightly in, stopping just short of clanging them together.",
      "Keep your feet planted and your shoulders on the bench.",
    ],
    example: "8 reps with 25 lb bells, elbows at about 45 degrees.",
    miss: "Flaring the elbows straight out, or bouncing the bells off your chest.",
  },
  "renegade-row": {
    focus: "Back and core, one arm at a time from a plank.",
    setup: "Hands on dumbbells, feet a little wider than a push-up, body in a straight line.",
    steps: [
      "Row one bell toward your hip without twisting the shoulders.",
      "Set it down softly, then row the other side.",
      "Squeeze the glutes so your hips do not rock.",
    ],
    example: "6 rows each side with 20 lb bells.",
    miss: "Hiking the hip of the working side to cheat the bell up.",
  },
  thrusters: {
    focus: "A squat into an overhead press, done as one motion.",
    setup: "Dumbbells at your shoulders, feet about shoulder-width.",
    steps: [
      "Squat until your hips are at least parallel.",
      "Drive up and use that speed to press the bells overhead.",
      "Finish with arms straight and ribs down, then lower the bells to the shoulders.",
    ],
    example: "8 thrusters with 20 lb bells.",
    miss: "Pressing before you have stood up, so the bells stall at your chin.",
  },
  "reverse-lunge": {
    focus: "One leg at a time: quads, glutes, and balance.",
    setup: "Dumbbells at your sides, or a bar on your back. Stand tall.",
    steps: [
      "Step back and lower until the back knee hovers over the floor.",
      "Front heel stays down. Both knees bend.",
      "Push through the front foot to stand, then switch legs.",
    ],
    example: "8 each leg with 25 lb bells.",
    miss: "The front knee collapsing inward, or a tiny step that never loads the leg.",
  },
  "box-jump": {
    focus: "Power. The height is the number you log, in inches.",
    setup: "Stand a short step back from a box you can land on quietly.",
    steps: [
      "Dip, swing the arms, and jump up onto the box.",
      "Land with soft knees, both feet fully on the box.",
      "Stand tall, then step down. Do not rebound off a sloppy landing.",
    ],
    example: "6 jumps onto a 20-inch box, each one stuck.",
    miss: "Landing on the toes and stumbling forward.",
  },
  "back-squat": {
    focus: "Quads and glutes with a bar on your upper back.",
    setup: "Bar on the shelf of your upper back, not your neck. Feet about shoulder-width, brace.",
    steps: [
      "Sit down and slightly back until your hips pass parallel.",
      "Knees track over your toes.",
      "Stand by driving the floor away, chest up.",
    ],
    example: "5 reps at 135 lb, the last one still above parallel.",
    miss: "Good-morning the squat, so your chest dumps and the bar rolls forward.",
  },
  "front-squat": {
    focus: "Quads, with the bar in front so your torso stays more upright.",
    setup: "Bar on the front of your shoulders, elbows high, fingertips under the bar.",
    steps: [
      "Sit straight down between your feet.",
      "Keep the elbows up so the bar does not roll.",
      "Drive up without shooting the hips back first.",
    ],
    example: "5 reps at 95 lb, elbows staying high the whole set.",
    miss: "Elbows dropping, which dumps the bar.",
  },
  "sumo-deadlift": {
    focus: "Same lift as a deadlift, with a wide stance and a more upright torso.",
    setup: "Feet wide, toes out. Hands inside your knees, bar over mid-foot.",
    steps: [
      "Push the knees out over the toes and take the slack out of the bar.",
      "Stand by pushing the floor apart, bar close to you.",
      "Lock the hips at the top without leaning back.",
    ],
    example: "5 reps at 135 lb, knees pushed out the whole way.",
    miss: "Hips shooting up first so it turns into a stiff-leg pull.",
  },
  "romanian-deadlift": {
    focus: "Hamstrings. You hinge, you do not squat.",
    setup: "Bar or bells in front of your thighs. Soft knees, not a deep bend.",
    steps: [
      "Push the hips back until you feel a stretch in the hamstrings.",
      "Keep the weight close and the back flat.",
      "Stand by squeezing the glutes. Do not bounce.",
    ],
    example: "8 reps at 95 lb, bar staying against the legs.",
    miss: "Bending the knees so much it becomes a regular deadlift.",
  },
  "hip-thrust": {
    focus: "Glutes.",
    setup: "Upper back on a bench, bar or bell across the hips, feet planted.",
    steps: [
      "Drive through the heels until your hips are in line with your knees and shoulders.",
      "Squeeze at the top for a beat. Ribs stay down.",
      "Lower until the hips are just off the floor, then go again.",
    ],
    example: "10 reps at 135 lb, a one-second squeeze on each.",
    miss: "Overarching the low back to fake a higher lockout.",
  },
  "good-morning": {
    focus: "Hamstrings and the spinal erectors, with a light bar.",
    setup: "Bar on your back like a squat. Knees softly bent.",
    steps: [
      "Hinge until your torso is about parallel, or as far as your hamstrings allow.",
      "Keep the bar over mid-foot.",
      "Stand tall by driving the hips forward.",
    ],
    example: "8 reps with just the bar, or 65 lb if that stays easy.",
    miss: "Using a deadlift weight. This is a lighter hinge.",
  },
  "barbell-bench": {
    focus: "Chest, shoulders, and triceps.",
    setup: "Eyes under the bar. Feet planted. Grip a little wider than shoulder-width.",
    steps: [
      "Unrack and lower the bar to the lower chest.",
      "Press up and slightly back toward the rack.",
      "Shoulder blades stay pinched.",
    ],
    example: "5 reps at 95 lb, bar touching the chest under control.",
    miss: "Bouncing the bar, or flaring the elbows to 90 degrees.",
  },
  "incline-bench": {
    focus: "Upper chest.",
    setup: "Bench around 30 degrees. Dumbbells or a bar over the upper chest.",
    steps: [
      "Lower until the upper arms are about parallel to the floor.",
      "Press up over the upper chest, not over the face.",
      "Keep the shoulders down, away from the ears.",
    ],
    example: "8 reps with 30 lb bells.",
    miss: "Setting the bench so steep it becomes a shoulder press.",
  },
  "overhead-press": {
    focus: "Shoulders and triceps.",
    setup: "Bar or bells at the shoulders, wrists stacked, glutes and ribs tight.",
    steps: [
      "Press straight up, moving the head through once the bar clears it.",
      "Finish with the weight over the middle of the foot, arms straight.",
      "Lower to the shoulders. Do not turn it into a push press.",
    ],
    example: "6 strict reps at 65 lb.",
    miss: "Leaning back so hard the low back takes the load.",
  },
  "push-press": {
    focus: "A shoulder press with a small leg drive.",
    setup: "Same rack as a strict press.",
    steps: [
      "Dip the knees a few inches, then drive up.",
      "Press as the hips lock. The legs start it; the arms finish it.",
      "Catch with arms straight overhead.",
    ],
    example: "5 reps at 85 lb.",
    miss: "A deep squat. The dip is short.",
  },
  "barbell-row": {
    focus: "Upper back.",
    setup: "Hinge until your torso is near parallel. Bar hanging under the shoulders.",
    steps: [
      "Pull the bar to the bottom of the ribs.",
      "Squeeze the shoulder blades, then lower with control.",
      "The torso does not stand up to help.",
    ],
    example: "8 reps at 95 lb.",
    miss: "Yanking with the low back and standing halfway up.",
  },
  "power-clean": {
    focus: "A pull from the floor into a front rack.",
    setup: "Deadlift stance. Hook grip if you use one. Bar over mid-foot.",
    steps: [
      "Push the floor away and keep the bar close.",
      "When it passes the knees, extend the hips hard.",
      "Pull yourself under and catch it on the front of the shoulders, elbows through.",
    ],
    example: "3 reps at 95 lb, each one re-set on the floor.",
    miss: "Reverse-curling the bar instead of catching it.",
  },
  "hang-clean": {
    focus: "The same catch as a power clean, starting from the hang.",
    setup: "Bar at mid-thigh, shoulders over the bar, knees soft.",
    steps: [
      "Hinge slightly, then snap the hips.",
      "Elbows stay high as the bar rises.",
      "Catch in a quarter squat with the bar on the shoulders.",
    ],
    example: "5 reps at 75 lb.",
    miss: "Starting the pull with a big arm bend.",
  },
  snatch: {
    focus: "A wide-grip pull from the floor to overhead.",
    setup: "Wide grip. Bar over mid-foot. Back flat.",
    steps: [
      "Pull close past the knees, then extend the hips.",
      "Punch under the bar and lock the arms.",
      "Stand up from the catch with the bar over mid-foot.",
    ],
    example: "3 power snatches at 65 lb.",
    miss: "Catching with bent elbows and pressing it out.",
  },
  "barbell-curl": {
    focus: "Biceps.",
    setup: "Stand tall, bar in front of the thighs, elbows at your sides.",
    steps: [
      "Curl until the bar is near the shoulders.",
      "Lower until the arms are straight.",
      "Keep the elbows from drifting forward.",
    ],
    example: "10 reps at 45 lb.",
    miss: "Swinging the hips to start each rep.",
  },
  "db-shoulder-press": {
    focus: "Shoulders, one bell in each hand.",
    setup: "Seated or standing, bells at shoulder height, palms forward.",
    steps: [
      "Press up until the arms are straight, bells close but not touching.",
      "Lower until the elbows are about level with the shoulders.",
      "Do not shrug the shoulders to the ears.",
    ],
    example: "8 reps with 20 lb bells.",
    miss: "Arching the back to turn it into an incline press.",
  },
  "db-row": {
    focus: "One side of the back.",
    setup: "One hand and one knee on a bench, or hinged with a free hand on a rack. Bell hanging.",
    steps: [
      "Pull the bell toward the hip.",
      "Pause when the elbow is past the ribs.",
      "Lower until the arm is straight.",
    ],
    example: "10 each side with a 30 lb bell.",
    miss: "Rotating the chest open to shorten the pull.",
  },
  "walking-lunge": {
    focus: "Quads and glutes, moving forward.",
    setup: "Bells at your sides. Stand tall.",
    steps: [
      "Step forward and lower the back knee toward the floor.",
      "Front heel stays down.",
      "Push through the front foot into the next step.",
    ],
    example: "8 steps each leg with 20 lb bells.",
    miss: "Steps so short you are just bobbing in place.",
  },
  "bulgarian-split-squat": {
    focus: "The front leg. The back foot is only there for balance.",
    setup: "Rear toes on a bench, front foot far enough forward that the knee can travel.",
    steps: [
      "Lower until the back knee is close to the floor.",
      "Keep most of the weight on the front heel.",
      "Stand by driving the front foot down.",
    ],
    example: "8 each leg with 25 lb bells.",
    miss: "Pushing off the back foot so the front leg never works.",
  },
  "step-up": {
    focus: "One leg, stepping onto a box.",
    setup: "Box about knee height. Bell or bells in your hands.",
    steps: [
      "Put the whole foot on the box.",
      "Stand up without a hop from the back leg.",
      "Step down under control and switch.",
    ],
    example: "8 each leg onto a 20-inch box with 20 lb bells.",
    miss: "Springing off the floor leg.",
  },
  "db-rdl": {
    focus: "Hamstrings, with dumbbells.",
    setup: "Bells in front of the thighs. Soft knees.",
    steps: [
      "Push the hips back until the bells pass the knees.",
      "Back stays flat. Bells stay close.",
      "Stand by squeezing the glutes.",
    ],
    example: "8 reps with 30 lb bells.",
    miss: "Rounding the shoulders and letting the bells swing forward.",
  },
  "lateral-raise": {
    focus: "Side delts.",
    setup: "Light bells at your sides, a tiny bend in the elbows.",
    steps: [
      "Raise the arms out to the side until they are about shoulder height.",
      "Lead with the elbows, not a shrug.",
      "Lower slowly.",
    ],
    example: "12 reps with 10 lb bells.",
    miss: "Swinging 25s up to the ears.",
  },
  "rear-delt-fly": {
    focus: "Rear shoulders and upper back.",
    setup: "Hinge forward, bells hanging under the chest, elbows soft.",
    steps: [
      "Open the arms out to the side until they are in line with the shoulders.",
      "Squeeze the shoulder blades a little.",
      "Lower without dropping them.",
    ],
    example: "12 reps with 8 lb bells.",
    miss: "Standing up and turning it into a row.",
  },
  "hammer-curl": {
    focus: "Biceps and brachialis. Palms face each other.",
    setup: "Bells at your sides, thumbs up.",
    steps: [
      "Curl without twisting the palms.",
      "Stop near the shoulders.",
      "Lower until the arms are straight.",
    ],
    example: "10 reps with 20 lb bells.",
    miss: "Elbows drifting forward and the shoulders taking over.",
  },
  "db-curl": {
    focus: "Biceps.",
    setup: "Bells at your sides, palms forward.",
    steps: [
      "Curl one or both bells toward the shoulders.",
      "Keep the upper arms still.",
      "Lower all the way.",
    ],
    example: "10 reps with 15 lb bells.",
    miss: "Rocking the torso.",
  },
  "chest-fly": {
    focus: "Chest stretch and squeeze, lighter than a press.",
    setup: "Lie on a bench, bells over the chest, elbows softly bent.",
    steps: [
      "Open the arms until you feel a stretch across the chest.",
      "The bend in the elbows stays the same.",
      "Bring the bells back together over the chest.",
    ],
    example: "10 reps with 15 lb bells.",
    miss: "Straightening the arms and turning it into a press with no control.",
  },
  "farmer-carry": {
    focus: "Grip, trunk, and posture under load.",
    setup: "A heavy bell in each hand. Stand tall before you walk.",
    steps: [
      "Walk in short, even steps.",
      "Shoulders down, ribs stacked over the hips.",
      "Set the bells down instead of dropping them.",
    ],
    example: "40 steps with 40 lb bells.",
    miss: "Leaning to one side or shrugging the whole way.",
  },
  "kb-clean": {
    focus: "A kettlebell swing that finishes in the rack.",
    setup: "One bell, hike it between the legs.",
    steps: [
      "Hinge and snap the hips.",
      "Keep the bell close and punch the hand through so it lands on the forearm.",
      "Catch it in the rack: bell on the shoulder, elbow in, wrist straight.",
    ],
    example: "6 cleans each side with a 35 lb bell.",
    miss: "Curling it onto the shoulder and banging the wrist.",
  },
  "turkish-get-up": {
    focus: "Getting from the floor to standing with a weight locked overhead.",
    setup: "Lie on your back, bell pressed up with a straight arm. Same-side knee bent.",
    steps: [
      "Roll to the elbow, then the hand, eyes on the bell.",
      "Sweep the straight leg under and come to a kneel.",
      "Stand up. Reverse the steps to lie back down. The arm never bends.",
    ],
    example: "3 each side with a 25 lb bell.",
    miss: "Looking away from the bell and letting the arm drift.",
  },
  "lat-pulldown": {
    focus: "Lats.",
    setup: "Sit tall, grip a little wider than the shoulders, thighs locked under the pads.",
    steps: [
      "Pull the bar to the upper chest.",
      "Elbows drive down and slightly back.",
      "Let the bar rise until the arms are straight, without shrugging at the top.",
    ],
    example: "10 reps at 80 lb.",
    miss: "Leaning way back and yanking with the arms.",
  },
  "seated-row": {
    focus: "Mid-back.",
    setup: "Sit tall at a cable row, chest up, knees soft.",
    steps: [
      "Pull the handle to the lower ribs.",
      "Squeeze the shoulder blades, then reach forward.",
      "The torso stays mostly still.",
    ],
    example: "10 reps at 70 lb.",
    miss: "Rocking back and forth to move the stack.",
  },
  "leg-press": {
    focus: "Quads and glutes, back supported.",
    setup: "Feet about shoulder-width on the platform, low enough that the knees can bend.",
    steps: [
      "Lower until the knees are around 90 degrees, low back still on the pad.",
      "Press the platform away without locking the knees hard.",
      "Do not let the hips tuck off the seat.",
    ],
    example: "10 reps at 180 lb.",
    miss: "Going so deep the low back rounds off the pad.",
  },
  "leg-curl": {
    focus: "Hamstrings.",
    setup: "Lying or seated curl. Pad sits just above the heels.",
    steps: [
      "Curl the pad toward your glutes.",
      "Pause, then lower until the legs are nearly straight.",
      "Hips stay down if you are lying.",
    ],
    example: "10 reps at 50 lb.",
    miss: "Swinging the weight with the hips.",
  },
  "leg-extension": {
    focus: "Quads.",
    setup: "Pad across the lower shins. Knees lined up with the machine's pivot.",
    steps: [
      "Straighten the legs.",
      "Squeeze at the top without throwing the weight.",
      "Lower until the knees are bent again.",
    ],
    example: "12 reps at 60 lb.",
    miss: "Kicking so hard the pad bounces.",
  },
  "calf-raise": {
    focus: "Calves.",
    setup: "Balls of the feet on a step or the machine platform. Legs straight.",
    steps: [
      "Drop the heels for a stretch.",
      "Rise as high as you can.",
      "Pause at the top, then lower.",
    ],
    example: "12 reps at bodyweight, or 80 lb on the machine.",
    miss: "Bouncing through a tiny range.",
  },
  "face-pull": {
    focus: "Rear shoulders and the muscles that hold the shoulder blades down.",
    setup: "Cable at face height, rope attachment.",
    steps: [
      "Pull the rope toward your face, hands ending beside the ears.",
      "Elbows stay high.",
      "Squeeze, then let the arms straighten.",
    ],
    example: "12 reps at 30 lb.",
    miss: "Turning it into a low row to the stomach.",
  },
  "tricep-pushdown": {
    focus: "Triceps.",
    setup: "Cable high. Elbows pinned to your sides.",
    steps: [
      "Push the handle down until the arms are straight.",
      "The elbows do not travel forward.",
      "Let it rise until the forearms are about parallel to the floor.",
    ],
    example: "12 reps at 40 lb.",
    miss: "Leaning over the stack and pushing with the shoulders.",
  },
  "cable-fly": {
    focus: "Chest, with a constant pull from the cables.",
    setup: "Cables set a little below the shoulders, one handle in each hand. Soft elbows.",
    steps: [
      "Bring the hands together in front of the chest.",
      "Open back until you feel a stretch.",
      "The elbow bend stays the same.",
    ],
    example: "12 reps at 15 lb a side.",
    miss: "Pressing with straight arms and a lot of shoulder.",
  },
  "chest-press": {
    focus: "Chest, on a machine so the path is fixed.",
    setup: "Seat set so the handles line up with the mid-chest. Feet flat.",
    steps: [
      "Press until the arms are straight, not locked hard.",
      "Lower until the elbows are about even with the torso.",
      "Shoulders stay down.",
    ],
    example: "10 reps at 70 lb.",
    miss: "Shoulders shrugged up by the ears.",
  },
  "pull-up": {
    focus: "Lats and arms. Log added weight if you use it, otherwise the reps are the work.",
    setup: "Hang from a bar, palms away, shoulders set down before you pull.",
    steps: [
      "Pull until the chin is over the bar.",
      "Lower until the arms are straight.",
      "Do not kip unless that is the version you meant to log.",
    ],
    example: "5 strict reps, or 5 with a 10 lb plate.",
    miss: "Half reps that stop with the elbows still bent at the bottom.",
  },
  "chin-up": {
    focus: "Lats and biceps. Palms face you.",
    setup: "Hang with a shoulder-width underhand grip.",
    steps: [
      "Pull the chest toward the bar.",
      "Chin clears the bar.",
      "Lower to a straight-arm hang.",
    ],
    example: "6 strict reps.",
    miss: "Curling the chin over with a swing.",
  },
  dip: {
    focus: "Chest and triceps.",
    setup: "Hands on parallel bars or a bench. Shoulders down.",
    steps: [
      "Lower until the upper arms are about parallel to the floor.",
      "Press back up until the arms are straight.",
      "Lean a little forward for chest, more upright for triceps.",
    ],
    example: "8 bodyweight reps, or 8 with a 10 lb bell between the feet.",
    miss: "Shrugging and sinking the shoulders toward the ears.",
  },
  "push-up": {
    focus: "Chest, shoulders, and core.",
    setup: "Hands under the shoulders, body in one line from head to heels.",
    steps: [
      "Lower the chest until it nearly touches the floor.",
      "Elbows stay at about 45 degrees, not flared straight out.",
      "Press the floor away and finish tall.",
    ],
    example: "10 reps from the toes, hips not sagging.",
    miss: "Hips piked up or dropped, so the chest never really moves.",
  },
  plank: {
    focus: "Holding a straight line. Time is the work, even if the logger uses a number.",
    setup: "Forearms under the shoulders, or hands if you are on a high plank.",
    steps: [
      "Brace as if someone is about to poke your stomach.",
      "Glutes on, ribs down, neck long.",
      "Stop when the low back starts to sag.",
    ],
    example: "A 40-second hold with the hips level.",
    miss: "Holding a sagging back just to add seconds.",
  },
  "sit-up": {
    focus: "Trunk flexion.",
    setup: "Knees bent, feet anchored if you use them. Hands at the temples, not yanking the neck.",
    steps: [
      "Curl up until the torso leaves the floor.",
      "Lower one vertebra at a time.",
      "Keep the motion smooth.",
    ],
    example: "15 reps.",
    miss: "Jerking the head forward with the hands.",
  },
  burpee: {
    focus: "A squat, a plank, and a jump, in that order.",
    setup: "Stand tall.",
    steps: [
      "Place the hands down and jump the feet back to a plank.",
      "Optional push-up, then jump the feet back in.",
      "Stand and jump, hands overhead.",
    ],
    example: "8 burpees, each one including a full plank.",
    miss: "Skipping the plank and just squatting up and down.",
  },
  "kettlebell-snatch": {
    focus: "One kettlebell from between the legs to overhead.",
    setup: "Bell in one hand, hike it back.",
    steps: [
      "Snap the hips. The bell stays close to the body.",
      "Punch through at the top so it lands softly on the forearm, arm straight.",
      "Lower it back down the same path.",
    ],
    example: "6 each side with a 25 lb bell.",
    miss: "Casting the bell out in a big arc that slams the wrist.",
  },
  "single-leg-deadlift": {
    focus: "One hamstring and your balance.",
    setup: "Stand on one leg, bell in the opposite hand or both hands.",
    steps: [
      "Hinge until the torso and the free leg make a line.",
      "Soft knee on the standing leg. Hips stay square.",
      "Stand by squeezing the standing glute.",
    ],
    example: "6 each leg with a 25 lb bell.",
    miss: "Opening the hip and spinning the free leg out to the side.",
  },
  "hack-squat": {
    focus: "Quads, back against the pad.",
    setup: "Shoulders under the pads, feet a bit low on the platform.",
    steps: [
      "Unlock and lower until the knees are around 90 degrees.",
      "Keep the low back on the pad.",
      "Press up without locking the knees violently.",
    ],
    example: "8 reps at 140 lb.",
    miss: "Letting the hips lift off the pad at the bottom.",
  },
  "pause-squat": {
    focus: "A squat with a still pause in the bottom.",
    setup: "Same setup as your back squat or goblet squat.",
    steps: [
      "Descend under control.",
      "Stop at the bottom and stay there for a full second. No bounce.",
      "Then stand.",
    ],
    example: "5 reps at a weight lighter than your normal squat, with a one-second pause.",
    miss: "A tap that is not actually a pause.",
  },
  "floor-press": {
    focus: "Chest and triceps, with a shorter range because the floor stops the elbows.",
    setup: "Lie on the floor, knees bent. Bells or a bar over the chest.",
    steps: [
      "Lower until the upper arms rest on the floor.",
      "Pause, then press up.",
      "Elbows stay at about 45 degrees.",
    ],
    example: "8 reps with 30 lb bells.",
    miss: "Bouncing the arms off the floor.",
  },
  "landmine-press": {
    focus: "A one-arm press on an angled bar.",
    setup: "Bar anchored in a corner or landmine. Hold the end at one shoulder, feet staggered.",
    steps: [
      "Press the bar up and away until the arm is straight.",
      "Do not twist the torso to finish it.",
      "Lower to the shoulder.",
    ],
    example: "8 each side.",
    miss: "Leaning away and side-bending the press.",
  },
  "sled-push": {
    focus: "Legs and lungs, driving a sled.",
    setup: "Arms long, hips about level with the shoulders, body in one line.",
    steps: [
      "Drive through the balls of the feet in short, fast steps.",
      "Do not stand upright and jog it.",
      "Stop the sled under control at the end of the lane.",
    ],
    example: "One 20-yard push with the sled loaded to 90 lb.",
    miss: "Standing up so the sled barely moves.",
  },
};

export function demoFor(movement: Pick<Movement, "id" | "name">): LiftDemo {
  return (
    DEMOS[movement.id] ?? {
      focus: `${movement.name}, the way you do it in class.`,
      setup: `Set up for ${movement.name} and get still before the first rep.`,
      steps: [
        "Brace, then start from a position you could pause in.",
        "Move through the full range you can control.",
        "Stop the set when the last rep is no longer clean.",
      ],
      example: `A working set of ${movement.name} where you could have done about two more reps.`,
      miss: "Cutting the range short just to make the number bigger.",
    }
  );
}
