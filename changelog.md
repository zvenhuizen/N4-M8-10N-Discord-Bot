# 2.8.2
    let prefixes get stored locally between restarts to reduce DB lookups
    fixed crit again
# 2.8.1
    fixed DM
    fixed chat remove
    fixed prefix server wide
# 2.8.0
    lots of shit
# 2.7.1
    fixed rr print error
    fixed char crit error
    
# 2.7.0
    local emoji
    removed a lot of stuff that i dont need
    please don't make a personal instance anymore.  set up is just too much now
# 2.6.7
    updated invite permissions

# 2.6.6
    -fixed Crit 66-70
    -added iOS's new stupid "i'm better just because im different" default double quotes

# 2.6.5
    -added patreonMega code

# 2.6.4
    -rich embeds for help

# 2.6.3
    -missing permission fix
    -ignore play command

# 2.6.2
    -stats fix

# 2.6.1
    -patreon dice fix

# 2.6.0
    -sharding and sharding emoji rewrite

# 2.5.3
    -fixed init and d roll
    -updated firebase and lodash
    -added inventory to !char

# 2.5.2
    -added duty
    -rewrote !char
    -added prefix to help

# 2.5.1
    -removes !dx
    -fixed a thing or two

# 2.5.0
    -added L5R functionality
    -compartmentalized game types

2.4.1
    -added role hierarchy for !prefix

2.4.0
    updated discord and firebase
    added !prefix

2.3.3
    -added !i remove command

2.3.2
    -added promise for writing data

2.3.1
    -new emoji
    -added catch statements to all (hopefully) promises
    -added catch for long poly rolls
    -fixed max die check

2.3.0
    -added promises for firebase data and time sensitive roll stuff
    -removed command tracker
    -remove init kill command until i can fix it

2.2.4
    -init reset fix

2.2.3
    -init set fix

2.2.2
    -char obligation fix
    -update firebase

2.2.1
    -redid help file
    -couple fixes for passing data
    -added check for random !

2.2.0
   -Redid a lot of stuff
   -all bar to let
   -cleaned up a lot of undefined checks
   -created index for the modules

2.1.7
  -added !story p or g

2.1.6
  -made lightpip and darkpip seperate from destiny tokens

2.1.5
  -added !story for Genesys
  -fixed genesys emoji for rolling initiative

2.1.4
  -merged https://github.com/SkyJedi/SWEotE-Discord-Dice-Roller/pull/20
  -renamed emoji folders
  -added stop for bot if it can't write to channel

2.1.3
  -fixed empty varibale crashes

2.1.2
  -botStats are back

2.1.1
  -rewrote how variables are called and stored
  -botstats disabled for now

2.1.0
  -roll rewrite
  -added !rr fortune
  -lots more

2.0.4
  -moved all config data to config.json
  -setup one click update
  -added a node_modules check to start.bat/command

2.0.3
  -moved server ID for emoji to config.json

2.0.2
  -can now use emoji in DM channel with D1

2.0.1
  -Removed all fix commands

2.0.0
  -moved storage to firebase

1.9.3
  -use external emoji check
  -botstats now needs 'daily' 'weekly' 'monthly' 'alltime'
  -added !char modify

1.9.2
  -!swrpg and !genesys switch

1.9.1
  -emojiID lookup again

1.9
  -no custom emoji needed anymore

1.8.4
  -update all the .sendmessage() to .send()
  -daily stats update

1.8.3
  -botStats

1.8.2
  -rewrote init

1.8.1
  -you can now start a command at any point to a message

1.8.0
  -Added !obligation

1.7.10
  -added !char obligation

1.7.9
  -added Crit lookup command ie !crit ?12

1.7.8
  -added !species/!gleepglop

1.7.7
  -added !poly

1.7.6
  -added !char crit
  -reformated crit module to allow use of crit table elsewhere

1.7.4
  - added !char remove to help command
  - added stop for trying to add 2 characters named the same

1.7.3
  - Polyhedral die rolls are now anything !dXXX
  - fixed triumph and despairs

1.7.2
  - fixed !init set bug that reset Init order on new round

1.7.1
  - fixed !rr select

1.7.0
  - recoded !roll into functions
  - redid modules
  - added polyhedral
  - added !reroll

1.6.7
  - added result symbols to DiceIdentifiers in rolls
      Success/Suc/ *  = success
      Advantage/Adv/V = advantage
      Triumph/Tri/! = triumph
      Failure/Fail/- = failure
      Threat/Thr/T = threat
      Despair/Des/$ = despair
      Light/L = lightside point
      Dark/N = darkside point

1.6.6
  - destiny roll now uses !roll module.
  - space fix: !roll yyy ggg rr now rolls all dice
  - tweaked !init roll a bit

1.6.5
  -cleaned up console.log
  -slimmed down !roll

1.6.4
  - fixed desc (for reals)

1.6.3
  - added mid round roll for !init

1.6.2
  - fixed an init error with the offline memory

1.6.1
  - fixed desc

1.6
  - added restart memory.  !destiny, !Char, !init no longer reset after crash or restart.

1.5.2
  - added "All dice have cancelled out" result

1.5.1
  - emoji defaults to on, new emoji disable instructions

1.5.0
  -added !init module

1.4.8
  - added some simple admin commands
  - added @reply to rolls and stuff

1.4.7.1
  - add !r and !d for shorter !roll and !destiny

1.4.7
  - fixed formatting in !help

1.4.6
  - added warning if ser doesn't have the correct custom emoji

1.4.5
  - added !char remove, list, and reset

1.4.4
  - module-ized the whole monty

1.4.3
  - added background emojiID lookup

1.4.2
  -  added/fixed !help

1.4.1
  -  Made a Changelog
  -  Fixed the one word error in the descriptor
  -  added ! command
