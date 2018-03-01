#!/usr/bin/env bash
gunicorn --reload --timeout 60 --bind 0.0.0.0:4100 'webapi.app:create_app()'
