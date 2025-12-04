provider "aws" {
  alias  = "aws-east"
  region = "us-east-1"
}

resource "aws_acm_certificate" "othello_cert" {
  provider          = aws.aws-east
  domain_name       = "othello.djmetzle.io"
  validation_method = "DNS"
}
