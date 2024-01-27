from lambdas.users.personal_info import lambda_handler


def test_lambda_handler():
    """ Tests the lambda handler.
        
        NOTE: This test is a quick check to verify the testing framework is working.
    """
    event = {}
    context = {}

    response = lambda_handler(event, context)

    assert response['statusCode'] == 200
    assert response['body']['firstName'] == 'Brandon Kubick'
    assert response['body']['lastName'] == 'Kubick'
    assert response['body']['tagline'] == 'Full-Stack Developer | Aerospace Engineer'
    assert response['body']['summary'] == """
            Hello, I'm Brandon, an expert with 2+ years of full-stack engineering
            experience and 2+ years of aviation aerospace engineering experience. I am
            passionate about solving complex problems and building scalable software
            solutions.
        """
