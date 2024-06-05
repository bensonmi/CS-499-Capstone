```mermaid
graph TD;
    Start[Initialize]
    InitializeActorCritic[Initialize actor and critic networks with random weights]
    RepeatEpisodes{Repeat for each episode}
    InitializeState[Initialize state of the environment]
    RepeatSteps{Repeat for each step in the episode}
    ChooseAction[Choose an action using the actor network]
    TakeAction[Take the action and observe reward and next state]
    CalculateAdvantage[Calculate advantage using the critic network]
    UpdateNetworks[Update actor and critic networks using the collected experiences]
    CheckEpisodeEnd{Check if episode has reached a terminal state}
    ResetState[Reset environment state if episode has ended]

    Start --> InitializeActorCritic
    InitializeActorCritic --> RepeatEpisodes
    RepeatEpisodes --> InitializeState
    InitializeState --> RepeatSteps
    RepeatSteps --> ChooseAction
    ChooseAction --> TakeAction
    TakeAction --> CalculateAdvantage
    CalculateAdvantage --> UpdateNetworks
    UpdateNetworks --> CheckEpisodeEnd
    CheckEpisodeEnd -- Episode ended --> ResetState
    CheckEpisodeEnd -- Episode ongoing --> RepeatSteps
    ResetState --> RepeatEpisodes


