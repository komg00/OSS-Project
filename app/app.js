const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const apiRouter = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', apiRouter);

let userDB = new Array();

apiRouter.post('/sayHello', function(req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          "basicCard": {
            "title": "MBTI 검사 챗봇",
            "description": "MBTI 검사 챗봇입니다! \n당신의 MBTI를 찾아보세요!",
            "thumbnail": {
              "imageUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fsnm5S%2Fbtq6cSXUkrD%2FOgk9QsUoPzQGvllliI0CSk%2Fimg.jpg"
            },
            "buttons": [
                {
                    "action": "message",
                    "label": "MBTI 테스트 시작하기",
                    "messageText": "MBTI 테스트 시작하기"
                }
            ]
          }
        }
      ]
    }
  };
  res.status(200).send(responseBody);
});

apiRouter.post('/question1', (req, res) => {
    var userId = req.body.userRequest.user.id;
  var mesg = req.body.userRequest;
  console.log('[q1:user message] ', mesg);
  userDB[userId] = '';
  console.log(userDB[userId]);
  const responseBody = {
      version: "2.0",
      template: {
          outputs: [
              {
                  simpleText: {
                      text: '사람들과 어울리는 것을 좋아하시나요?'
                  }
              }
          ],
          quickReplies: [
              {
                  action: "block",
                  label: "네",
                  message: "네",
                  blockId: "628e8cb07bd2fd433357f878"
              },
              {
                  action: "block",
                  label: "아니오",
                  message: "아니오",
                  blockId: "628e8cb07bd2fd433357f878"
              }
          ]
      }
  }
  res.status(200).send(responseBody);
});

apiRouter.post('/question2', (req, res) => {
    var userId = req.body.userRequest.user.id;
    var mesg = req.body.userRequest.utterance;
    console.log('[q2:user message] ', mesg);
    var mbti = ''; 
    if (mesg == "네") {
        mbti = 'E';
    } else if (mesg == "아니오") {
        mbti = 'I';
    }
    userDB[userId] += mbti;
    console.log(userDB[userId]);
    const responseBody = {
      version: "2.0",
      template: {
          outputs: [
              {
                  simpleText: {
                      text: '평소 깻잎논쟁에 1시간 이상을 생각해봤다.'
                  }
              }
          ],
          quickReplies: [
              {
                  action: "block",
                  label: "네",
                  message: "네",
                  blockId: "628d239d93b31d5b60ab6c29"
              },
              {
                  action: "block",
                  label: "아니오",
                  message: "아니오",
                  blockId: "628d239d93b31d5b60ab6c29"
              }
          ]
      }
  }
  res.status(200).send(responseBody);
});

apiRouter.post('/question3', function(req, res) {
    var userId = req.body.userRequest.user.id;
    var mesg = req.body.userRequest.utterance;
    console.log('[q3:user message] ', mesg);
    var mbti = '';
    if (mesg == '네') {
        mbti = 'N';
    } else if (mesg == '아니오') {
        mbti = 'S';
    }
    userDB[userId] += mbti;
    console.log(userDB[userId]);
    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    "simpleText": {
                        "text": "다음과 같은 상황에서 어떻게 대답하겠습니까?\n 친구: 나 기분 안 좋아서 옷 샀어"
                    }
                }
            ],
            quickReplies: [
                {
                    action: "block",
                    label: "왜 기분 안 좋아?",
                    message: "왜 기분 안 좋아?",
                    blockId: "6290630451c40d32c6d8e71f"
                },
                {
                    action: "block",
                    label: "무슨 옷 샀어?",
                    message: "무슨 옷 샀어?",
                    blockId: "6290630451c40d32c6d8e71f"
                }
            ]
        }
    };
    res.status(200).send(responseBody);
});

apiRouter.post('/question4', (req, res) => {
    var userId = req.body.userRequest.user.id;
  var mesg = req.body.userRequest.utterance;
  console.log('[q4:user message] ', mesg);
  var mbti = ''; 
  if (mesg == "왜 기분 안 좋아?") {
      mbti = 'F';
  } else if (mesg == "무슨 옷 샀어?") {
      mbti = 'T';
  }
  userDB[userId] += mbti;
  console.log(userDB[userId]);
  const responseBody = {
      version: "2.0",
      template: {
          outputs: [
              {
                  simpleText: {
                      text: "그날 할 일에 대해 계획을 미리 세우시나요?"
                  }
              }
          ],
          quickReplies: [
            {
                action: "block",
                label: "네",
                message: "네",
                blockId: "6293885b7bd2fd4333583df0"
            },
            {
                action: "block",
                label: "아니오",
                message: "아니오",
                blockId: "6293885b7bd2fd4333583df0"
            }
        ]
      }
  }
  res.status(200).send(responseBody);
});

apiRouter.post('/result', (req, res) => {
    var userId = req.body.userRequest.user.id;
  var mesg = req.body.userRequest.utterance;
  console.log('[result:user message] ', mesg);
  var mbti = ''; 
  if (mesg == "네") {
      mbti = 'J';
  } else if (mesg == "아니오") {
      mbti = 'P';
  }
  userDB[userId] += mbti;
  console.log(userDB[userId]);
  const responseBody = {
      version: "2.0",
      template: {
          outputs: [
              {
                  simpleText: {
                      text: "당신의 MBTI는 : "+userDB[userId]
                  }
              }
          ],
          quickReplies: [{
              action: "block",
              label: "MBTI 테스트 다시하기",
              message: "MBTI 테스트 다시하기",
              blockId : "628b8005055a574d7df54466"
          }]
      }
  }
  res.status(200).send(responseBody);
});

app.listen((process.env.PORT || 3000), function() {
  console.log('Example skill server listening on port 3000!');
});